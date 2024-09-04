# Check if Node.js is installed
if (-Not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Installing Node.js..."

    # Download Node.js installer
    $nodeInstaller = "https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi"
    $installerPath = "$env:TEMP\nodejs_installer.msi"
    Invoke-WebRequest -Uri $nodeInstaller -OutFile $installerPath

    # Install Node.js silently
    Start-Process msiexec.exe -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait

    # Remove the installer
    Remove-Item $installerPath

    # Verify installation
    if (-Not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "Node.js installation failed. Please install Node.js manually."
        exit 1
    } else {
        Write-Host "Node.js installed successfully."
    }
} else {
    Write-Host "Node.js is already installed."
}