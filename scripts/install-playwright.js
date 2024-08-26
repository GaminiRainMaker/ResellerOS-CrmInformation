const {execSync} = require('child_process');

try {
  execSync('npx playwright install', {stdio: 'inherit'});
  console.log('Playwright browsers installed successfully');
} catch (error) {
  console.error('Error installing Playwright browsers:', error.message);
  process.exit(1);
}
