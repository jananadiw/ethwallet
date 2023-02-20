'use client';

import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { TxnButton } from './components/atoms/txnButton';
import { ConnectWalletButton } from './components/atoms/walletConnectButton';
import { AccountBalance } from './components/molecules/accountBalance';

export default function Home(): React.ReactElement {
    const [walletAddress, setWalletAddress] = useState('');
    const [etherBalance, setEtherBalance] = useState(0);
    // Check if window.ethereum is defined
    const isWindowEthereumDefined = (): boolean => {
        return (
            typeof window !== 'undefined' &&
            typeof window.ethereum !== 'undefined'
        );
    };
    const web3 = new Web3(window.ethereum);

    // Find connected wallet when page reloads
    useEffect(() => {
        // TODO: eslint@typescript-eslint/no-floating-promises
        void getConnectedAccounts();
        swichAccountListener();
    });

    // Connect Metamask Wallet
    const connectWallet = async (): Promise<void> => {
        if (isWindowEthereumDefined()) {
            try {
                const accounts = await web3.eth.requestAccounts();
                setWalletAddress(accounts[0]);
            } catch (e) {
                console.error(e);
            }
        } else {
            console.log('metamask is not installed');
        }
    };

    // Get Currently connect Metamask Wallet Accounts
    const getConnectedAccounts = async (): Promise<void> => {
        if (isWindowEthereumDefined()) {
            try {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    const address = web3.utils
                        .toChecksumAddress(accounts[0])
                        .toLowerCase();
                    const balanceInWei = await web3.eth.getBalance(address);
                    const balanceInEth =
                        Math.round(
                            Number(web3.utils.fromWei(balanceInWei, 'ether')) *
                                1000
                        ) / 1000;
                    setEtherBalance(balanceInEth);
                } else {
                    // we've lost connection to the wallet
                    setEtherBalance(0);
                    console.log('Connect to Metamask');
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            console.log('metamask is not installed');
        }
    };

    // Switch Account
    const swichAccountListener = () => {
        if (isWindowEthereumDefined()) {
            window.ethereum.on('accountsChanged', (accounts: any) => {
                setWalletAddress(accounts[0]);
            });
        } else {
            setWalletAddress('');
            setEtherBalance(0);
            console.log('metamask is not installed');
        }
    };

    return (
        <>
            <main>
                <div className="font-mono container mx-auto my-56 p-12 bg-gray-100 rounded">
                    <div className="mx-20">
                        <ConnectWalletButton
                            props={walletAddress}
                            onClick={connectWallet}
                        />
                        <p className="text-2xl">Hello, Test Wallet</p>
                    </div>

                    <div>
                        <AccountBalance
                            props={{ ether: etherBalance, token: 0 }}
                        />
                        <div className="text-l m-8 p-8 flex gap-6 justify-center">
                            <TxnButton data="Send Tokens" />
                            <TxnButton data="Send Ether" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
