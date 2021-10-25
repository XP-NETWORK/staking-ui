import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { store } from "../redux/store"
import { updateAccount } from "../redux/counterSlice"


//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
    infuraId: "2a744e8fea924e1fbec4bc041e05dd00",
});

const web3 = new Web3(provider);

provider.on("accountsChanged", accounts  => {
});

provider.on("chainChanged", chainId => {
    console.log(chainId);
});
  
//  Enable session (triggers QR Code modal)

export const getWalletAccounts = async () => {
    try{
        const accounts = await web3.eth.getAccounts();
        console.log("getWalletAccounts: ",accounts);
        store.dispatch(updateAccount(accounts[0]))
    }
    catch(error){
        alert(error)
        console.log(console.error());
    }

}
