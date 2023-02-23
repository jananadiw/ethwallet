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

    const transferToken = async (): Promise<void> => {
        const web3 = new Web3(window.ethereum);
        const tokenContract = new web3.eth.Contract(tokenABI as AbiItem[], tokenAddress);
        // get current connected account
        const accounts = await web3.eth.getAccounts();
        // Send the data to the contract, contract sends the tokens to receiver account.
        await tokenContract.methods
            .transferTokens(txnInfo.address, web3.utils.toWei(txnInfo.amount.toString()))
            .send({ from: accounts[0] });
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
                        <TxnButton data="Confirm Transfer" onClick={transferToken}></TxnButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
