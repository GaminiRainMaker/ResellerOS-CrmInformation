import os from 'os';

export default function handler(req, res) {
  const networkInterfaces = os.networkInterfaces();
  let localIp = '';

  // Loop through the network interfaces and find the IPv4 non-internal IP address
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const addressInfo of addresses) {
      if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
        localIp = addressInfo.address;
        break;
      }
    }
    if (localIp) break;
  }

  res.status(200).json({ip: localIp});
}
