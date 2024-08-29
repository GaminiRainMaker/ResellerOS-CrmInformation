import {chromium} from 'playwright';

export default async function handler(req, res) {
  try {
    // Launch the Playwright server
    const browserServer = await chromium.launchServer({headless: false});
    const wsEndpoint = browserServer.wsEndpoint();

    // Send the WebSocket endpoint to the client
    res.status(200).json({wsEndpoint});
  } catch (error) {
    // Handle errors
    res.status(500).json({error: error.message});
  }
}
