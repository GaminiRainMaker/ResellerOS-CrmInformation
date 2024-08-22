import type {NextApiRequest, NextApiResponse} from 'next';
import path from 'path';
import fs from 'fs';
import {exec} from 'child_process';
import util from 'util';
import {test, expect} from '@playwright/test';
const execPromise = util.promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {email, password, data, script} = req.body.data;
    console.log('script', JSON.parse(script[0]));

    // Parse the script from the string array if needed
    const userScript = JSON.parse(script[0]);
    console.log('userScript', userScript);
    // Inject email and password into the user script
    await eval(userScript);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
