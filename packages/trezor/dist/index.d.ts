import type { CustomNetwork, WalletInit } from '@web3-onboard/common';
interface TrezorOptions {
    email: string;
    appUrl: string;
    customNetwork?: CustomNetwork;
}
declare function trezor(options: TrezorOptions): WalletInit;
export default trezor;
