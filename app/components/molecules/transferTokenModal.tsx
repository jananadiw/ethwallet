'use-client';

import Web3 from 'web3';
import { useState } from 'react';
import { TxnButton } from '../atoms/txnButton';
import { tokenABI } from '@/public/tokenABI';
// types
import type { AbiItem } from 'web3-utils';

export function TransferTokenModal({ props, setOpenModal }: any): React.ReactElement {
    const tokenAddress = props;
    const [txnInfo, setTxnInfo] = useState({
        address: '',
        amount: '',
    });

    const transferTokens = async (): Promise<void> => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(tokenABI as AbiItem[], tokenAddress);
        // convert amount to wei
        // const amountWei = web3.utils.toWei(txnInfo.amount);
        await contract.methods.transferTokens('0x0dB4931F9Aa07A4f7Acd350Bda2A0aD29b0CaeA8', '10000000000').call();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTxnInfo({
            ...txnInfo,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
    };

    // Transfer tokens to another account
    return (
        <div className="font-mono grid h-screen place-items-center fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity mx-auto">
            <div className="block p-4 bg-gray-200 rounded">
                <button className="btn float-right" onClick={() => setOpenModal(false)}>
                    X
                </button>
                <form onSubmit={handleSubmit} method="post" className="flex flex-col m-12">
                    <label className="py-2" htmlFor="address">
                        Recipient Address:
                    </label>
                    <input
                        className="p-2 rounded"
                        type="text"
                        id="address"
                        name="address"
                        value={txnInfo.address}
                        onChange={handleChange}
                    />
                    <label className="py-2" htmlFor="amount">
                        Amount of tokens:
                    </label>
                    <input
                        className="p-2 rounded"
                        type="text"
                        id="amount"
                        name="amount"
                        value={txnInfo.amount}
                        onChange={handleChange}
                    />
                    <div className="mt-8">
                        <TxnButton data="Confirm Transfer" onClick={transferTokens}></TxnButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
