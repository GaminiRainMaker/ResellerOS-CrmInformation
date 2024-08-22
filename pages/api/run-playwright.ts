import type {NextApiRequest, NextApiResponse} from 'next';
import {chromium} from 'playwright';
import {runCLI} from '@jest/core';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {email, password, data, script} = req.body?.data;

    // Log the incoming request data for debugging
    console.log('Received request data:', {email, password, data, script});

    const config = {
      testRegex:
        'npx playwright test test/salesForce.spec.js --project chromium --headed',
      testEnvironmentOptions: {
        data: data,
      },
    };

    await runCLI({config}, [process.cwd()])
      .then(() => {
        res.status(200).json({message: 'Test executed successfully'});
      })
      .catch((error: any) => {
        res.status(500).json({message: 'Test execution failed', error});
      });

    // try {
    //   // Parse the script from the string array
    //   const userScript = JSON.parse(script[0]);

    //   // Create a dynamic function to execute the user script
    //   // const runScript = new Function(
    //   //   'email',
    //   //   'password',
    //   //   'data',
    //   //   'browser',
    //   //   `
    //   //   return (async () => {
    //   //     const page = await browser.newPage();
    //   //     try {
    //   //       ${userScript}
    //   //     } catch (e) {
    //   //       console.error('Error in user script:', e);
    //   //       throw e;
    //   //     } finally {
    //   //       await page.close();
    //   //     }
    //   //   })();
    //   // `,
    //   // );

    //   // // Launch a Playwright browser instance
    //   // const browser = await chromium.launch({headless: true});
    //   // console.log('browser2345678', browser);

    //   // // Execute the user script
    //   // await runScript(email, password, data, browser);

    //   // Close the browser
    //   // await browser.close();

    //   res.status(200).json({message: 'Script executed successfully.'});
    // } catch (error: any) {
    //   console.error('Error executing script:', error);
    //   res
    //     .status(500)
    //     .json({error: 'Script execution failed.', details: error.message});
    // }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
