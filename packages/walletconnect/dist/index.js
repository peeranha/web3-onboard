import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { ProviderRpcError, ProviderRpcErrorCode } from '@web3-onboard/common';
function walletConnect(options) {
    const { bridge = 'https://bridge.walletconnect.org', qrcodeModalOptions } = options || {};
    return () => {
        return {
            label: 'WalletConnect',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async ({ chains, EventEmitter }) => {
                const { default: WalletConnect } = await import('@walletconnect/client');
                const { default: QRCodeModal } = await import('@walletconnect/qrcode-modal');
                const { Subject, fromEvent } = await import('rxjs');
                const { takeUntil, take } = await import('rxjs/operators');
                const connector = new WalletConnect({
                    bridge
                });
                const emitter = new EventEmitter();
                class EthProvider {
                    constructor({ connector, chains }) {
                        this.emit = emitter.emit.bind(emitter);
                        this.on = emitter.on.bind(emitter);
                        this.removeListener = emitter.removeListener.bind(emitter);
                        this.connector = connector;
                        this.chains = chains;
                        this.disconnected$ = new Subject();
                        this.providers = {};
                        // listen for session updates
                        fromEvent(this.connector, 'session_update', (error, payload) => {
                            if (error) {
                                throw error;
                            }
                            return payload;
                        })
                            .pipe(takeUntil(this.disconnected$))
                            .subscribe({
                            next: ({ params }) => {
                                const [{ accounts, chainId }] = params;
                                this.emit('accountsChanged', accounts);
                                this.emit('chainChanged', `0x${chainId.toString(16)}`);
                            },
                            error: console.warn
                        });
                        // listen for disconnect event
                        fromEvent(this.connector, 'disconnect', (error, payload) => {
                            if (error) {
                                throw error;
                            }
                            return payload;
                        })
                            .pipe(takeUntil(this.disconnected$))
                            .subscribe({
                            next: () => {
                                this.emit('accountsChanged', []);
                                this.disconnected$.next(true);
                                typeof localStorage !== 'undefined' &&
                                    localStorage.removeItem('walletconnect');
                            },
                            error: console.warn
                        });
                        this.disconnect = () => this.connector.killSession();
                        this.request = async ({ method, params }) => {
                            if (method === 'eth_chainId') {
                                return `0x${this.connector.chainId.toString(16)}`;
                            }
                            if (method === 'eth_requestAccounts') {
                                return new Promise((resolve, reject) => {
                                    // Check if connection is already established
                                    if (!this.connector.connected) {
                                        // create new session
                                        this.connector.createSession().then(() => {
                                            QRCodeModal.open(this.connector.uri, () => reject(new ProviderRpcError({
                                                code: 4001,
                                                message: 'User rejected the request.'
                                            })), qrcodeModalOptions);
                                        });
                                    }
                                    else {
                                        const { accounts, chainId } = this.connector.session;
                                        this.emit('chainChanged', `0x${chainId.toString(16)}`);
                                        return resolve(accounts);
                                    }
                                    // Subscribe to connection events
                                    fromEvent(this.connector, 'connect', (error, payload) => {
                                        if (error) {
                                            throw error;
                                        }
                                        return payload;
                                    })
                                        .pipe(take(1))
                                        .subscribe({
                                        next: ({ params }) => {
                                            const [{ accounts, chainId }] = params;
                                            this.emit('accountsChanged', accounts);
                                            this.emit('chainChanged', `0x${chainId.toString(16)}`);
                                            QRCodeModal.close();
                                            resolve(accounts);
                                        },
                                        error: reject
                                    });
                                });
                            }
                            if (method === 'wallet_switchEthereumChain' ||
                                method === 'eth_selectAccounts') {
                                throw new ProviderRpcError({
                                    code: ProviderRpcErrorCode.UNSUPPORTED_METHOD,
                                    message: `The Provider does not support the requested method: ${method}`
                                });
                            }
                            // @ts-ignore
                            if (method === 'eth_sendTransaction') {
                                // @ts-ignore
                                return this.connector.sendTransaction(params[0]);
                            }
                            // @ts-ignore
                            if (method === 'eth_signTransaction') {
                                // @ts-ignore
                                return this.connector.signTransaction(params[0]);
                            }
                            // @ts-ignore
                            if (method === 'personal_sign') {
                                // @ts-ignore
                                return this.connector.signPersonalMessage(params);
                            }
                            // @ts-ignore
                            if (method === 'eth_sign') {
                                // @ts-ignore
                                return this.connector.signMessage(params);
                            }
                            // @ts-ignore
                            if (method === 'eth_signTypedData') {
                                // @ts-ignore
                                return this.connector.signTypedData(params);
                            }
                            if (method === 'eth_accounts') {
                                return this.connector.sendCustomRequest({
                                    id: 1337,
                                    jsonrpc: '2.0',
                                    method,
                                    params
                                });
                            }
                            const chainId = await this.request({ method: 'eth_chainId' });
                            if (!this.providers[chainId]) {
                                const currentChain = chains.find(({ id }) => id === chainId);
                                if (!currentChain) {
                                    throw new ProviderRpcError({
                                        code: ProviderRpcErrorCode.CHAIN_NOT_ADDED,
                                        message: `The Provider does not have a rpcUrl to make a request for the requested method: ${method}`
                                    });
                                }
                                this.providers[chainId] = new StaticJsonRpcProvider(currentChain.rpcUrl);
                            }
                            return this.providers[chainId].send(method, 
                            // @ts-ignore
                            params);
                        };
                    }
                }
                return {
                    provider: new EthProvider({ chains, connector })
                };
            }
        };
    };
}
export default walletConnect;
