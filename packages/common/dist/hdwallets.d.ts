import type Common from '@ethereumjs/common';
import type { CustomNetwork } from './types';
import type { TransactionRequest } from '@ethersproject/providers';
/**
 * Creates the common instance used for signing
 * transactions with hardware wallets
 * @returns the initialized common instance
 */
export declare const getCommon: ({ customNetwork, chainId }: {
    customNetwork?: CustomNetwork | undefined;
    chainId: number;
}) => Promise<Common>;
declare type StringifiedTransactionRequest = Omit<TransactionRequest, 'nonce' | 'gasLimit' | 'gasPrice' | 'value' | 'maxPriorityFeePerGas' | 'maxFeePerGas'> & {
    nonce: string;
    gasLimit: string;
    gasPrice?: string;
    value: string;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
};
/**
 * Takes in TransactionRequest and converts all BigNumber values to strings
 * @param transaction
 * @returns a transaction where all BigNumber properties are now strings
 */
export declare const bigNumberFieldsToStrings: (transaction: TransactionRequest) => StringifiedTransactionRequest;
export {};
