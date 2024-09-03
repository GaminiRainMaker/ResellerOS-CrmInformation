#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Installing Node.js..."

    # Determine OS
    OS=$(uname)
    if [ "$OS" = "Linux" ]; then
        # Linux: Install Node.js using package manager
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [ "$OS" = "Darwin" ]; then
        # macOS: Install Node.js using Homebrew
        if ! command -v brew &> /dev/null
        then
            echo "Homebrew is not installed. Installing Homebrew first..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install node
    else
        echo "Unsupported OS. Please install Node.js manually."
        exit 1
    fi

    # Verify installation
    if ! command -v node &> /dev/null
    then
        echo "Node.js installation failed. Please install Node.js manually."
        exit 1
    else
        echo "Node.js installed successfully."
    fi
else
    echo "Node.js is already installed."
fi

# Install Playwright globally
npm install -g playwright

# Launch Playwright with Chromium
npx playwright install

