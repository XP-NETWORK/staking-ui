import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
});

export const walletconnect = new WalletConnectConnector({ 
  rpc: { 
    // 1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    56: "https://bsc-dataseed.binance.org"
  },
  supportedChainIds: [56],
  qrcode: true,
});