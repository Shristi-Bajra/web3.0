const hre = require("hardhat");

const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy(); // Deploy contract

    await transactions.waitForDeployment(); // ✅ Correct method for ethers v6

    console.log("Transactions deployed to:", await transactions.getAddress()); // ✅ Correct way to get address
};

const runMain = async () => {
    try { 
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
