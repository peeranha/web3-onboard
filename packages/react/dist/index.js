import { useEffect, useState, useCallback, useMemo } from 'react';
import Web3Onboard from '@web3-onboard/core';
export let web3Onboard = null;
export const init = (options) => {
    web3Onboard = Web3Onboard(options);
    return web3Onboard;
};
export const useConnectWallet = () => {
    if (!web3Onboard)
        throw new Error('Must initialize before using hooks.');
    const [wallet, setConnectedWallet] = useState(() => web3Onboard.state.get().wallets[0] || null);
    const [connecting, setConnecting] = useState(false);
    useEffect(() => {
        const subscription = web3Onboard.state
            .select('wallets')
            .subscribe(wallets => setConnectedWallet(wallets[0] || null));
        return () => subscription.unsubscribe();
    }, [wallet]);
    const connect = useCallback(async (options) => {
        setConnecting(true);
        const [connectedWallet] = await web3Onboard.connectWallet(options);
        setConnecting(false);
        setConnectedWallet(connectedWallet || null);
    }, []);
    const disconnect = useCallback(async ({ label }) => {
        setConnecting(true);
        await web3Onboard.disconnectWallet({ label });
        setConnectedWallet(null);
        setConnecting(false);
    }, []);
    return [{ wallet, connecting }, connect, disconnect];
};
export const useSetChain = (walletLabel) => {
    if (!web3Onboard)
        throw new Error('Must initialize before using hooks.');
    const { state, setChain } = web3Onboard;
    const [settingChain, setInProgress] = useState(false);
    const [connectedChain, setConnectedChain] = useState(() => {
        const initialWallets = web3Onboard.state.get().wallets;
        if (initialWallets.length === 0)
            return null;
        return ((initialWallets.find(({ label }) => label === walletLabel) ||
            initialWallets[0]).chains[0] || null);
    });
    const chains = useMemo(() => state.get().chains, []);
    useEffect(() => {
        const subscription = state.select('wallets').subscribe(wallets => {
            const wallet = wallets.find(({ label }) => label === walletLabel) || wallets[0];
            wallet && setConnectedChain(wallet.chains[0]);
        });
        return () => subscription.unsubscribe();
    }, []);
    const set = useCallback(async (options) => {
        setInProgress(true);
        const success = await setChain({ ...options, wallet: walletLabel });
        setInProgress(false);
        return success;
    }, []);
    return [{ chains, connectedChain, settingChain }, set];
};
export const useWallets = () => {
    if (!web3Onboard)
        throw new Error('Must initialize before using hooks.');
    const [wallets, setConnectedWallets] = useState(() => web3Onboard.state.get().wallets);
    useEffect(() => {
        const wallets$ = web3Onboard.state.select('wallets');
        const subscription = wallets$.subscribe(setConnectedWallets);
        return () => subscription.unsubscribe();
    }, []);
    return wallets;
};
