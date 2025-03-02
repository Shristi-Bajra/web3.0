import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

// const getEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const transactionContracts = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );

//   return transactionContracts;
// };

const getEthereumContract = async () => {
  if (!ethereum) {
    alert("No Ethereum provider found! Please install MetaMask.");
    return null;
  }

  const provider = new ethers.BrowserProvider(ethereum); // ✅ Use BrowserProvider
  const signer = await provider.getSigner(); // ✅ Await getSigner() in ethers v6

  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const transactionContract = await getEthereumContract(); // ✅ Await this function

      const availableTransactions =
        await transactionContract.getAllTransaction();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleDateString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
      console.log(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransaction();
      } else {
        console.log("No account Found");
      }
      //   console.log(accounts);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
        const transactionContract = await getEthereumContract(); // ✅ Await the function
        if (!transactionContract) return;

        const transactionCount = await transactionContract.getTransactionCount(); // ✅ Call correctly
        window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
        console.error("Wallet Connection Error:", error);
    }
};


  //   const connectWallet = async () => {
  //     try {
  //       if (!ethereum) return alert("Please install metamask");

  //       const accounts = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });

  //       setCurrentAccount(accounts[0]);
  //       console.log("Ethereum object:", ethereum);

  //     } catch (error) {
  //       console.log(error);

  //       throw new Error("No ethereum object.");
  //     }
  //   };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]); // ✅ Ensure the state updates immediately
      localStorage.setItem("connectedAccount", accounts[0]); // Optional: store in localStorage
    } catch (error) {
      console.error("Wallet Connection Error:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const { addressTo, amount, keyword, message } = formData; // ✅ Fix typo (formData, not FormData)
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount._hex, // ✅ Fix: toHexString() ensures proper formatting
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Transaction failed! Check the console.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist(); // ✅ Add parentheses to invoke the function
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
