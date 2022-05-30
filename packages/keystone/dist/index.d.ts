import type { CustomNetwork, WalletInit } from '@web3-onboard/common';
declare function keystone({ customNetwork }?: {
    customNetwork?: CustomNetwork;
}): WalletInit;
export default keystone;
