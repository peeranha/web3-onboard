function coinbaseWallet({ darkMode = false } = {}) {
    return () => {
        return {
            label: 'Coinbase Wallet',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async ({ chains, appMetadata }) => {
                const [chain] = chains;
                const { name, icon } = appMetadata || {};
                const { CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk');
                const base64 = window.btoa(icon || '');
                const appLogoUrl = `data:image/svg+xml;base64,${base64}`;
                const instance = new CoinbaseWalletSDK({
                    appName: name || '',
                    appLogoUrl,
                    darkMode
                });
                const coinbaseWalletProvider = instance.makeWeb3Provider(chain.rpcUrl, parseInt(chain.id));
                // patch the chainChanged event
                const on = coinbaseWalletProvider.on.bind(coinbaseWalletProvider);
                coinbaseWalletProvider.on = (event, listener) => {
                    on(event, val => {
                        if (event === 'chainChanged') {
                            listener(`0x${val.toString(16)}`);
                            return;
                        }
                        listener(val);
                    });
                    return coinbaseWalletProvider;
                };
                return {
                    provider: coinbaseWalletProvider,
                    instance
                };
            }
        };
    };
}
export default coinbaseWallet;
