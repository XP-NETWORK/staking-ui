import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
    infuraId: "2a744e8fea924e1fbec4bc041e05dd00",
});
const web3 = new Web3(provider);

const pro = async () => {
    try {
        await provider.enable();
    } catch (error) {
        console.log(error);
    }
}
pro()

//  Enable session (triggers QR Code modal)
// await provider.enable();
export const getAccounts = async () => {
    debugger
    try{
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }
    catch(error){
        console.log(error);
    }

}