import { WalletInit } from '@web3-onboard/common';
declare type GnosisOptions = {
    whitelistedDomains: RegExp[];
};
declare function gnosis(options?: GnosisOptions): WalletInit;
export default gnosis;
