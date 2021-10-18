import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";


//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
    infuraId: "2a744e8fea924e1fbec4bc041e05dd00",
});
const web3 = new Web3(provider);

//  Get Accounts
export const getAccounts = async () => {
    debugger
    try{
        const accounts = await web3.eth.getAccounts();
        console.log("walletConnect: ", accounts)
    }
    catch(error){
        console.log(error)
    }
}

//  Get Chain Id
export const getChainID = async () => {
    try{
        const chainId = await web3.eth.chainId();
    }
    catch(error){
        console.log(error)
    }
}

//  Get Network Id
export const getNetworkId = async () => {
    try{
        const networkId = await web3.eth.net.getId();
    }
    catch(error){
        console.log(error)
    }
}


// // Send Transaction
// export const sendTransaction = async () => {
//     try{
//         const txHash = await web3.eth.sendTransaction(tx);
//     }
//     catch(error){
//         console.log(error)
//     }
// }

// // Sign Transaction
// export const signTransaction = async () => {
//     try{
//         const signedTx = await web3.eth.signTransaction(tx);
//     }
//     catch(error){
//         console.log(error)
//     }
// }

// Sign Message
// export const signMessage = async () => {
//     try{
//         const signedMessage = await web3.eth.sign(msg);
//     }
//     catch(error){
//         console.log(error)
//     }
// }

// Sign Typed Data
// export const signTyped
// const signedTypedData = await web3.eth.signTypedData(msg);


// //  Enable session (triggers QR Code modal)
// await provider.enable();