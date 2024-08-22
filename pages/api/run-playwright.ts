import type { NextApiRequest, NextApiResponse } from 'next';
import { runCLI } from '@jest/core';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body.data;

    // Log the incoming request data for debugging
    console.log('Received request data:', data);

    // Create a temporary config file to pass data
    const configFilePath = path.join(process.cwd(), 'jest.config.js');

    const configContent = `
      module.exports = {
        testRegex: 'npx playwright test test/sampleTest.spec.js --project chromium --headed',
        testEnvironmentOptions: {
          data: ${JSON.stringify(data)},
        },
      };
    `;

    try {
      // Write the temporary config file
      await fs.writeFile(configFilePath, configContent);

      // Prepare arguments for runCLI
      const argv = {
        config: configFilePath,
        _: [], // This represents other positional arguments if needed, it's required by yargs but can be left empty
        $0: '', // Represents the script name, also required by yargs but can be an empty string
      };

      await runCLI(argv, [process.cwd()])
        .then(() => {
          res.status(200).json({ message: 'Test executed successfully' });
        })
        .catch((error: any) => {
          res.status(500).json({ message: 'Test execution failed', error });
        })
        .finally(async () => {
          // Clean up: remove the temporary config file
          await fs.unlink(configFilePath);
        });

    } catch (error) {
      res.status(500).json({ message: 'Error writing config file', error });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
