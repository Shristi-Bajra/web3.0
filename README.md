### Web3.0 

### Overview

This is a decentralized Web3.0 application that enables users to send transactions seamlessly. The project integrates MetaMask for authentication and wallet connection, and Giphy API to display GIFs related to the transactions.

### Features

Blockchain Transactions: Users can send transactions via Ethereum blockchain.

MetaMask Integration: Securely connect and interact with the blockchain using MetaMask.

Giphy API: Fetch and display GIFs related to the transaction.

User-friendly UI: A simple and intuitive interface for sending transactions.

### Technologies Used

Frontend: React.js, Tailwind CSS

Blockchain: Solidity, Ethereum, Web3.js

Wallet Connection: MetaMask

GIF Integration: Giphy API

### Installation

Clone the repository:

git clone https://github.com/your-username/web3-transaction.git
cd web3-transaction

Install dependencies:

npm install

Start the development server:

npm run dev

### Usage

Open the app in your browser.

Connect your MetaMask wallet.

Enter transaction details (recipient address, amount, message, etc.).

Click "Send Transaction" and confirm it in MetaMask.

A corresponding GIF will be displayed after the transaction is completed.

### Environment Variables

Create a .env file and add:

VITE_GIPHY_API_KEY=your_giphy_api_key

