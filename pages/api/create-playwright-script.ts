import type {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';
import util from 'util';

// Promisify exec to use with async/await
const execPromise = util.promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const {stdout, stderr} = await execPromise('npx playwright codegen');
      if (stderr) {
        console.error(stderr);
        return res.status(500).json({error: stderr});
      }

      return res.status(200).json({output: stdout});
    } catch (error: any) {
      res
        .status(500)
        .json({error: 'Failed to execute script', details: error.message});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
