import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
});
const web3 = new Web3(provider);

// //  Enable session (triggers QR Code modal)
// await provider.enable();