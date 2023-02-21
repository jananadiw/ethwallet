'use client';

import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import { TxnButton } from './components/atoms/txnButton';
import { ConnectWalletButton } from './components/atoms/walletConnectButton';
import { AccountBalance } from './components/molecules/accountBalance';
import { TransferEthModal } from './components/molecules/transferEthModal';

export default function Home(): React.ReactElement {
    const [walletAddress, setWalletAddress] = useState('');
    const [etherBalance, setEtherBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState('');
    const tokenAddress = '0x38FdD1B2AB51d54816d435028D12dFf493cE439B';
    const [showEthTxnModal, setShowEthTxnModal] = useState(false);
    // const [showTokenTxnModal, setShowTokenTxnModal] = useState(false);
    // const etherTransferAddress = '0x043Ab92F418325eEF1A8A6Ed43C5aF805c5e3bFc';

    // TODO: Move to a separate json file
    const tokenABI = [
        {
            constant: true,
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'walletAddress', type: 'address' },
            ],
            name: 'getBalance',
            outputs: [{ name: '', type: 'uint256' }],
            type: 'function',
        },
    ];

    // Find connected wallet when page reloads
    useEffect(() => {
        void getConnectedAccounts();
        swichAccountListener();
    });

    // Connect Metamask Wallet
    const connectWallet = async (): Promise<void> => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                const web3 = new Web3(window.ethereum);
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
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            try {
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    const address = web3.utils.toChecksumAddress(accounts[0]).toLowerCase();
                    // TODO: Remove antipattern like this
                    const balanceInWei = await web3.eth.getBalance(address);
                    const balanceInEth = Math.round(Number(web3.utils.fromWei(balanceInWei, 'ether')) * 1000) / 1000;
                    setEtherBalance(balanceInEth);
                    // connect to contract
                    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
                    // get token balance
                    const res = await tokenContract.methods.getBalance(tokenAddress, walletAddress).call();
                    const formatted = web3.utils.fromWei(res);
                    setTokenBalance(formatted);
                } else {
                    // we've lost connection to the wallet
                    setEtherBalance(0);
                    setTokenBalance('');
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
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts: any) => {
                setWalletAddress(accounts[0]);
            });
        } else {
            setWalletAddress('');
            setEtherBalance(0);
            setTokenBalance('');
            console.log('metamask is not installed');
        }
    };

    return (
        <>
            <main>
                <div className="font-mono container mx-auto my-56 p-12 bg-gray-100 rounded">
                    <div className="mx-20">
                        <ConnectWalletButton props={walletAddress} onClick={connectWallet} />
                        <p className="text-2xl">Hello, Test Wallet</p>
                    </div>

                    <div>
                        <AccountBalance props={{ ether: etherBalance, token: tokenBalance }} />
                        <div className="text-l m-8 p-8 flex gap-6 justify-center">
                            {/* <TxnButton
                                data="Send Tokens"
                                onClick={() => {
                                    setShowTokenTxnModal(true);
                                }}
                            /> */}
                            <TxnButton
                                data="Send Ether"
                                onClick={() => {
                                    setShowEthTxnModal(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {showEthTxnModal && <TransferEthModal props={walletAddress} setOpenModal={setShowEthTxnModal} />}
                {/* {showTokenTxnModal && <TransferTokenModal props={walletAddress} setOpenModal={setShowTokenTxnModal} />} */}
            </main>
        </>
    );
}
