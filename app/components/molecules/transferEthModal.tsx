'use-client';

import { useState } from 'react';
import Web3 from 'web3';
import { TxnButton } from '../atoms/txnButton';

export function TransferEthModal({ props, setOpenModal }: any): React.ReactElement {
    const walletAddress = props;
    const [txnInfo, setTxnInfo] = useState({
        address: '',
        amount: '',
    });

    // Send ether to an another account
    const transferEth = async (): Promise<void> => {
        // TODO: Take from user input
        const web3 = new Web3(window.ethereum);
        await web3.eth.sendTransaction({
            from: walletAddress,
            // to: '0x0dB4931F9Aa07A4f7Acd350Bda2A0aD29b0CaeA8',
            to: txnInfo.address,
            value: web3.utils.toWei(`${txnInfo.amount}`, 'ether'),
            gasPrice: 20000000000,
        });
    };

    const handleChange = (event: any) => {
        setTxnInfo({
            ...txnInfo,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event: any) => {
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
                        Amount to Send (in Ether):
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
                        <TxnButton data="Confirm Transfer" onClick={transferEth}></TxnButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
