import { WalletInit } from '@web3-onboard/common';
interface WalletConnectOptions {
    bridge?: string;
    qrcodeModalOptions?: {
        mobileLinks: string[];
    };
}
declare function walletConnect(options?: WalletConnectOptions): WalletInit;
export default walletConnect;
