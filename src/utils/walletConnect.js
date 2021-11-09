import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
    infuraId: "2a744e8fea924e1fbec4bc041e05dd00",
});
const web3 = new Web3(provider);
provider.on("accountsChanged", (accounts) => {
  
});
export const QR = async () => {
    try {
        await provider.enable();
    } catch (error) {
        console.log(error);
    }
}

QR()

//  Enable session (triggers QR Code modal)

export const getWalletAccounts = async () => {
    try{
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);
    }
    catch(error){

        console.log(console.error());
    }

}
