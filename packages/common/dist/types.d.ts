import type { ethers, BigNumber } from 'ethers';
import type EventEmitter from 'eventemitter3';
import type { TypedData as EIP712TypedData } from 'eip-712';
export type { TypedData as EIP712TypedData } from 'eip-712';
/**
 * Types for request patching methods. Ethereum RPC request is mapped to
 * the implementation that will replace the original.
 * If a method is not supported set it to `null`
 * and the appropriate error will get called.
 */
export declare type RequestPatch = {
    eth_accounts?: ((args: {
        baseRequest: EIP1193Provider['request'];
    }) => Promise<ProviderAccounts>) | null;
    eth_getBalance?: ((args: {
        baseRequest: EIP1193Provider['request'];
    }) => Promise<Balance>) | null;
    eth_requestAccounts?: ((args: {
        baseRequest: EIP1193Provider['request'];
    }) => Promise<ProviderAccounts>) | null;
    eth_selectAccounts?: ((args: {
        baseRequest: EIP1193Provider['request'];
    }) => Promise<ProviderAccounts>) | null;
    eth_chainId?: ((args: {
        baseRequest: EIP1193Provider['request'];
    }) => Promise<string>) | null;
    eth_signTransaction?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EthSignTransactionRequest['params'];
    }) => Promise<string>) | null;
    eth_sendTransaction?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EthSignTransactionRequest['params'];
    }) => Promise<string>) | null;
    eth_sign?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EthSignMessageRequest['params'];
    }) => Promise<string>) | null;
    personal_sign?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: PersonalSignMessageRequest['params'];
    }) => Promise<string>) | null;
    eth_signTypedData?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EIP712Request['params'];
    }) => Promise<string>) | null;
    wallet_switchEthereumChain?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EIP3326Request['params'];
    }) => Promise<null>) | null;
    wallet_addEthereumChain?: ((args: {
        baseRequest: EIP1193Provider['request'];
        params: EIP3085Request['params'];
    }) => Promise<null>) | null;
};
export declare type AccountSelectAPI = (options: SelectAccountOptions) => Promise<Account>;
export declare type SelectAccountOptions = {
    basePaths: BasePath[];
    assets: Asset[];
    chains: Chain[];
    scanAccounts: ScanAccounts;
    supportsCustomPath?: boolean;
};
export declare type BasePath = {
    label: string;
    value: DerivationPath;
};
export declare type DerivationPath = string;
export declare type Asset = {
    label: string;
    address?: string;
};
export declare type ScanAccounts = (options: ScanAccountsOptions) => Promise<Account[]>;
export declare type ScanAccountsOptions = {
    derivationPath: DerivationPath;
    chainId: Chain['id'];
    asset: Asset;
};
export declare type AccountAddress = string;
export declare type Account = {
    address: AccountAddress;
    derivationPath: DerivationPath;
    balance: {
        asset: Asset['label'];
        value: BigNumber;
    };
};
export declare type AccountsList = {
    all: Account[];
    filtered: Account[];
};
export interface AppMetadata {
    name: string;
    icon: string;
    logo?: string;
    description?: string;
    gettingStartedGuide?: string;
    explore?: string;
    /** When no injected wallets detected, recommend the user to install some*/
    recommendedInjectedWallets?: RecommendedInjectedWallets[];
    agreement?: TermsOfServiceAgreementOptions | null;
}
export declare type TermsOfServiceAgreementOptions = {
    version: string;
    termsUrl?: string;
    privacyUrl?: string;
};
export declare type RecommendedInjectedWallets = {
    name: string;
    url: string;
};
/**
 * A method that takes `WalletHelpers` and
 * returns an initialised `WalletModule` or array of `WalletModule`s.
 */
export declare type WalletInit = (helpers: WalletHelpers) => WalletModule | WalletModule[] | null;
export declare type WalletHelpers = {
    device: Device;
};
export interface APIKey {
    apiKey: string;
}
export declare type Device = {
    os: DeviceOS;
    type: DeviceType;
    browser: DeviceBrowser;
};
export declare type Platform = DeviceOSName | DeviceBrowserName | DeviceType | 'all';
export declare type DeviceOS = {
    name: DeviceOSName;
    version: string;
};
export declare type DeviceBrowser = {
    name: DeviceBrowserName;
    version: string;
};
export declare type DeviceOSName = 'Windows Phone' | 'Windows' | 'macOS' | 'iOS' | 'Android' | 'Linux' | 'Chrome OS';
export declare type DeviceBrowserName = 'Android Browser' | 'Chrome' | 'Chromium' | 'Firefox' | 'Microsoft Edge' | 'Opera' | 'Safari';
export declare type DeviceType = 'desktop' | 'mobile' | 'tablet';
export interface WalletModule {
    label: string;
    /**
     * Gets the icon of the wallet
     * @returns
     */
    getIcon: () => Promise<string>;
    /**
     * @returns the wallet interface associated with the module
     */
    getInterface: (helpers: GetInterfaceHelpers) => Promise<WalletInterface>;
}
export declare type GetInterfaceHelpers = {
    chains: Chain[];
    appMetadata: AppMetadata | null;
    BigNumber: typeof ethers.BigNumber;
    EventEmitter: typeof EventEmitter;
};
export declare type ChainId = string;
export declare type RpcUrl = string;
export declare type WalletInterface = {
    provider: EIP1193Provider;
    instance?: unknown;
};
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}
export interface ProviderMessage {
    type: string;
    data: unknown;
}
export interface ProviderInfo {
    chainId: ChainId;
}
/**
 * An array of addresses
 */
export declare type ProviderAccounts = AccountAddress[];
export declare type ProviderEvent = 'connect' | 'disconnect' | 'message' | 'chainChanged' | 'accountsChanged';
export interface SimpleEventEmitter {
    on(event: ProviderEvent, listener: ConnectListener | DisconnectListener | MessageListener | ChainListener | AccountsListener): void;
    removeListener(event: ProviderEvent, listener: ConnectListener | DisconnectListener | MessageListener | ChainListener | AccountsListener): void;
}
export declare type ConnectListener = (info: ProviderInfo) => void;
export declare type DisconnectListener = (error: ProviderRpcError) => void;
export declare type MessageListener = (message: ProviderMessage) => void;
export declare type ChainListener = (chainId: ChainId) => void;
export declare type AccountsListener = (accounts: ProviderAccounts) => void;
/**
 * The hexadecimal representation of the users
 */
export declare type Balance = string;
export interface TransactionObject {
    data?: string;
    from: string;
    gas?: string;
    gasLimit?: string;
    gasPrice?: string;
    to: string;
    chainId: number;
    value?: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    nonce?: string;
}
interface BaseRequest {
    params?: never;
}
export interface EthAccountsRequest extends BaseRequest {
    method: 'eth_accounts';
}
export interface EthChainIdRequest extends BaseRequest {
    method: 'eth_chainId';
}
export interface EthSignTransactionRequest {
    method: 'eth_signTransaction';
    params: [TransactionObject];
}
declare type Address = string;
declare type Message = string;
export interface EthSignMessageRequest {
    method: 'eth_sign';
    params: [Address, Message];
}
export interface PersonalSignMessageRequest {
    method: 'personal_sign';
    params: [Message, Address];
}
export interface EIP712Request {
    method: 'eth_signTypedData';
    params: [Address, EIP712TypedData];
}
export interface EthBalanceRequest {
    method: 'eth_getBalance';
    params: [string, (number | 'latest' | 'earliest' | 'pending')?];
}
export interface EIP1102Request extends BaseRequest {
    method: 'eth_requestAccounts';
}
export interface SelectAccountsRequest extends BaseRequest {
    method: 'eth_selectAccounts';
}
export interface EIP3085Request {
    method: 'wallet_addEthereumChain';
    params: AddChainParams[];
}
export interface EIP3326Request {
    method: 'wallet_switchEthereumChain';
    params: [{
        chainId: ChainId;
    }];
}
export declare type AddChainParams = {
    chainId: ChainId;
    chainName?: string;
    nativeCurrency: {
        name?: string;
        symbol?: string;
        decimals: number;
    };
    rpcUrls: string[];
};
export interface EIP1193Provider extends SimpleEventEmitter {
    on(event: 'connect', listener: ConnectListener): void;
    on(event: 'disconnect', listener: DisconnectListener): void;
    on(event: 'message', listener: MessageListener): void;
    on(event: 'chainChanged', listener: ChainListener): void;
    on(event: 'accountsChanged', listener: AccountsListener): void;
    request(args: EthAccountsRequest): Promise<ProviderAccounts>;
    request(args: EthBalanceRequest): Promise<Balance>;
    request(args: EIP1102Request): Promise<ProviderAccounts>;
    request(args: SelectAccountsRequest): Promise<ProviderAccounts>;
    request(args: EIP3326Request): Promise<null>;
    request(args: EIP3085Request): Promise<null>;
    request(args: EthChainIdRequest): Promise<ChainId>;
    request(args: EthSignTransactionRequest): Promise<string>;
    request(args: EthSignMessageRequest): Promise<string>;
    request(args: PersonalSignMessageRequest): Promise<string>;
    request(args: EIP712Request): Promise<string>;
    request(args: {
        method: string;
        params?: Array<unknown>;
    }): Promise<unknown>;
    disconnect?(): void;
}
export declare enum ProviderRpcErrorCode {
    ACCOUNT_ACCESS_REJECTED = 4001,
    ACCOUNT_ACCESS_ALREADY_REQUESTED = -32002,
    UNAUTHORIZED = 4100,
    INVALID_PARAMS = -32602,
    UNSUPPORTED_METHOD = 4200,
    DISCONNECTED = 4900,
    CHAIN_DISCONNECTED = 4901,
    CHAIN_NOT_ADDED = 4902,
    DOES_NOT_EXIST = -32601
}
export interface Chain {
    namespace?: 'evm';
    id: ChainId;
    rpcUrl: string;
    label: string;
    token: TokenSymbol;
    color?: string;
    icon?: string;
}
export declare type TokenSymbol = string;
export interface CustomNetwork {
    networkId: number;
    genesis: GenesisBlock;
    hardforks: Hardfork[];
    bootstrapNodes: BootstrapNode[];
}
export interface GenesisBlock {
    hash: string;
    timestamp: string | null;
    gasLimit: number;
    difficulty: number;
    nonce: string;
    extraData: string;
    stateRoot: string;
}
export interface Hardfork {
    name: string;
    block: number | null;
}
export interface BootstrapNode {
    ip: string;
    port: number | string;
    network?: string;
    chainId?: number;
    id: string;
    location: string;
    comment: string;
}
