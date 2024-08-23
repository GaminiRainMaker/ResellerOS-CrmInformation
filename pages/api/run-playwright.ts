import type {NextApiRequest, NextApiResponse} from 'next';
import {run} from 'jest-cli';
import {promises as fs} from 'fs';
import path from 'path';
import { chromium } from 'playwright';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body.data;

    // Log the incoming request data for debugging
    console.log('Received request data:', data);

    // Create a temporary config file to pass data
    // const configFilePath = path.join(process.cwd(), 'jest.config.js');

    const configContent = `
      module.exports = {
        testRegex: 'tests/sampleTest.spec.js',
        testEnvironmentOptions: {
          data: ${data},
        },
      };
    `;

    try {
      // Launch Chromium
      const browser = await chromium.launch({headless: false});
      const context = await browser.newContext();
      const page = await context.newPage();

      // Dynamically execute the script
      const executeScript = new Function('page', data?.script);
      await executeScript(page);

      await browser.close();

      res.status(200).json({ message: 'Script executed successfully' });
  } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Error executing script', error: error.message });
  }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
