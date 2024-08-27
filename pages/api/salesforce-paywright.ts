import type {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';
import util from 'util';
import path from 'path';

// Construct the absolute path to Playwright binary
const playwrightPath = path.resolve('node_modules/.bin/playwright');
// Promisify exec to use with async/await
const execPromise = util.promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const {stdout: stdout1, stderr: stderr1} = await execPromise(
        `${playwrightPath} test test/salesForce.spec.js --project chromium --headed`,
      );

      if (stderr1) {
        console.error(stderr1);
        return res.status(500).json({error: stderr1});
      }

      return res.status(200).json({output: stdout1});
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
