import type { SvelteComponent } from 'svelte';
import type { AppMetadata, Device, WalletInit, EIP1193Provider, WalletModule, Chain, TokenSymbol } from '@web3-onboard/common';
import type setChain from './chain';
import type connect from './connect';
import type disconnect from './disconnect';
import type { state } from './store';
import type en from './i18n/en.json';
export interface InitOptions {
    wallets: WalletInit[];
    chains: Chain[];
    appMetadata?: AppMetadata;
    i18n?: i18nOptions;
    accountCenter?: AccountCenterOptions;
}
export interface OnboardAPI {
    connectWallet: typeof connect;
    disconnectWallet: typeof disconnect;
    setChain: typeof setChain;
    state: typeof state;
}
export interface ConnectOptions {
    autoSelect?: {
        label: string;
        disableModals: boolean;
    };
}
export interface ConnectOptionsString {
    autoSelect?: string;
}
export interface DisconnectOptions {
    label: string;
}
export interface WalletWithLoadedIcon extends Omit<WalletModule, 'getIcon'> {
    icon: string;
}
export interface WalletWithLoadingIcon extends Omit<WalletWithLoadedIcon, 'icon'> {
    icon: Promise<string>;
}
export declare type ConnectedChain = {
    id: Chain['id'];
    namespace: Chain['namespace'];
};
export interface WalletState {
    label: string;
    icon: string;
    provider: EIP1193Provider;
    accounts: Account[];
    chains: ConnectedChain[];
    instance?: unknown;
}
export declare type Account = {
    address: Address;
    ens: Ens | null;
    balance: Balances | null;
};
export declare type Balances = Record<TokenSymbol, string> | null;
export interface Ens {
    name: string;
    avatar: Avatar | null;
    contentHash: string | null;
    getText: (key: string) => Promise<string | undefined>;
}
export declare type Avatar = {
    url: string;
    linkage: Array<{
        type: string;
        content: string;
    }>;
};
export declare type Address = string;
export interface AppState {
    chains: Chain[];
    walletModules: WalletModule[];
    wallets: WalletState[];
    accountCenter: AccountCenter;
    locale: Locale;
}
export declare type InternalState = {
    svelteInstance: SvelteComponent | null;
    appMetadata: AppMetadata | null;
    device: Device | null;
};
export declare type Locale = string;
export declare type i18nOptions = Record<Locale, i18n>;
export declare type i18n = typeof en;
export declare type AccountCenterPosition = 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export declare type AccountCenter = {
    enabled: boolean;
    position?: AccountCenterPosition;
    expanded?: boolean;
    minimal?: boolean;
};
export declare type AccountCenterOptions = {
    desktop: Omit<AccountCenter, 'expanded'>;
    mobile: Omit<AccountCenter, 'expanded'>;
};
export declare type Action = AddChainsAction | AddWalletAction | UpdateWalletAction | RemoveWalletAction | ResetStoreAction | UpdateAccountAction | UpdateAccountCenterAction | SetWalletModulesAction | SetLocaleAction;
export declare type AddChainsAction = {
    type: 'add_chains';
    payload: Chain[];
};
export declare type AddWalletAction = {
    type: 'add_wallet';
    payload: WalletState;
};
export declare type UpdateWalletAction = {
    type: 'update_wallet';
    payload: {
        id: string;
    } & Partial<WalletState>;
};
export declare type RemoveWalletAction = {
    type: 'remove_wallet';
    payload: {
        id: string;
    };
};
export declare type ResetStoreAction = {
    type: 'reset_store';
    payload: unknown;
};
export declare type UpdateAccountAction = {
    type: 'update_account';
    payload: {
        id: string;
        address: string;
    } & Partial<Account>;
};
export declare type UpdateAccountCenterAction = {
    type: 'update_account_center';
    payload: AccountCenter | Partial<AccountCenter>;
};
export declare type SetWalletModulesAction = {
    type: 'set_wallet_modules';
    payload: WalletModule[];
};
export declare type SetLocaleAction = {
    type: 'set_locale';
    payload: string;
};
export declare type ChainStyle = {
    icon: string;
    color: string;
};
