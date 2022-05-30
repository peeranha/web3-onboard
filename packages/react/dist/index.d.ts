import type { InitOptions, OnboardAPI, ConnectOptions, DisconnectOptions, WalletState, ConnectedChain } from '@web3-onboard/core';
import { Chain } from '@web3-onboard/common';
export declare let web3Onboard: OnboardAPI | null;
export declare const init: (options: InitOptions) => OnboardAPI;
export declare const useConnectWallet: () => [{
    wallet: WalletState | null;
    connecting: boolean;
}, (options: ConnectOptions) => Promise<void>, (wallet: DisconnectOptions) => Promise<void>];
declare type SetChainOptions = {
    chainId: string;
    chainNamespace?: string;
};
export declare const useSetChain: (walletLabel?: string | undefined) => [{
    chains: Chain[];
    connectedChain: ConnectedChain | null;
    settingChain: boolean;
}, (options: SetChainOptions) => Promise<boolean>];
export declare const useWallets: () => WalletState[];
export {};
