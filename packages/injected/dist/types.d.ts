import type { ExternalProvider } from '@ethersproject/providers';
import { EIP1193Provider, WalletModule, ProviderAccounts, Platform, Device } from '@web3-onboard/common';
/**
 * The `ProviderIdentityFlag` is a property on an injected provider
 * that uniquely identifies that provider
 */
export declare enum ProviderIdentityFlag {
    AlphaWallet = "isAlphaWallet",
    AToken = "isAToken",
    Binance = "bbcSignTx",
    Bitpie = "isBitpie",
    BlockWallet = "isBlockWallet",
    Coinbase = "isToshi",
    CoinbaseExtension = "isCoinbaseWallet",
    Detected = "request",
    Dcent = "isDcentWallet",
    Frame = "isFrame",
    HuobiWallet = "isHbWallet",
    HyperPay = "isHyperPay",
    ImToken = "isImToken",
    Liquality = "isLiquality",
    MeetOne = "wallet",
    MetaMask = "isMetaMask",
    MyKey = "isMYKEY",
    OwnBit = "isOwnbit",
    Status = "isStatus",
    Trust = "isTrust",
    TokenPocket = "isTokenPocket",
    TP = "isTp",
    WalletIo = "isWalletIO",
    XDEFI = "isXDEFI",
    OneInch = "isOneInchIOSWallet",
    Tokenary = "isTokenary",
    Tally = "isTally",
    BraveWallet = "isBraveWallet"
}
export declare enum ProviderLabel {
    AlphaWallet = "AlphaWallet",
    AToken = "AToken",
    Binance = "Binance Smart Wallet",
    Bitpie = "Bitpie",
    BlockWallet = "BlockWallet",
    Brave = "Brave Wallet",
    Coinbase = "Coinbase Wallet",
    Dcent = "D'CENT",
    Detected = "Detected Wallet",
    Frame = "Frame",
    HuobiWallet = "Huobi Wallet",
    HyperPay = "HyperPay",
    ImToken = "imToken",
    Liquality = "Liquality",
    MeetOne = "MeetOne",
    MetaMask = "MetaMask",
    MyKey = "MyKey",
    Opera = "Opera Wallet",
    OwnBit = "OwnBit",
    Status = "Status Wallet",
    Trust = "Trust Wallet",
    TokenPocket = "TokenPocket",
    TP = "TP Wallet",
    WalletIo = "Wallet.io",
    XDEFI = "XDEFI Wallet",
    OneInch = "1inch Wallet",
    Tokenary = "Tokenary Wallet",
    Tally = "Tally Wallet"
}
export interface MeetOneProvider extends ExternalProvider {
    wallet?: string;
}
export interface BinanceProvider extends EIP1193Provider {
    bbcSignTx: () => void;
    requestAccounts: () => Promise<ProviderAccounts>;
    isUnlocked: boolean;
}
export declare enum InjectedNameSpace {
    Ethereum = "ethereum",
    Binance = "BinanceChain",
    Tally = "tally",
    Web3 = "web3",
    Arbitrum = "arbitrum",
    XFI = "xfi"
}
export interface CustomWindow extends Window {
    BinanceChain: BinanceProvider;
    ethereum: InjectedProvider;
    tally: InjectedProvider;
    web3: ExternalProvider | MeetOneProvider;
    arbitrum: InjectedProvider;
    xfi: {
        ethereum: InjectedProvider;
    };
}
export declare type InjectedProvider = ExternalProvider & BinanceProvider & MeetOneProvider & Record<string, boolean> & Record<string, InjectedProvider[]>;
export declare type WalletFilters = {
    [key in ProviderLabel | string]?: Platform[] | boolean;
};
export interface InjectedWalletOptions {
    custom?: InjectedWalletModule[];
    filter?: WalletFilters;
}
export interface InjectedWalletModule extends WalletModule {
    injectedNamespace: InjectedNameSpace;
    checkProviderIdentity: (helpers: {
        provider: any;
        device: Device;
    }) => boolean;
    platforms: Platform[];
}
