import type { CustomNetwork, WalletInit } from '@web3-onboard/common';
declare function ledger({ customNetwork }?: {
    customNetwork?: CustomNetwork;
}): WalletInit;
export default ledger;
