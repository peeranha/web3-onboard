import type { ProviderRpcErrorCode } from './types';
export declare class ProviderRpcError extends Error {
    message: string;
    code: ProviderRpcErrorCode | number;
    data?: unknown;
    constructor(error: Pick<ProviderRpcError, 'message' | 'code' | 'data'>);
}
