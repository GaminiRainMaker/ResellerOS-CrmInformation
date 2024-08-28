import type {NextApiRequest, NextApiResponse} from 'next';
import {chromium} from 'playwright';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body.data;
    const script = JSON.parse(data[0]);

    // Log the incoming request data for debugging

    // Create a temporary config file to pass data
    // const configFilePath = path.join(process.cwd(), 'jest.config.js');

    const executeScript = new Function(
      'page',
      `
      return (async () => {
          ${script}
      })();
  `,
    );
    try {
      // Launch Chromium
      const browser = await chromium.launch({headless: true});
      const context = await browser.newContext();
      const page = await context.newPage();
      console.log(data?.script, 'sdfbsdbf');

      // Dynamically execute the script
      await executeScript(page);

      await browser.close();

      res.status(200).json({message: 'Script executed successfully'});
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({message: 'Error executing script', error: error.message});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
