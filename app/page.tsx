'use client'

import Web3 from 'web3';
import React, {useEffect, useState} from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [etherBalance, setEtherBalance] = useState(0);

  // Find connected wallet when page reloads
  useEffect(() => {
    getConnectedAccounts();
    swichAccountListener();
  })

  // Connect Metamask Wallet
  const connectWallet = async() => {
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.requestAccounts();
        setWalletAddress(accounts[0]);
        console.log(accounts)
      }catch(e) {
        console.error(e)
      }
    } else {
      console.log('metamask is not installed')
    }
  }

  // Get Currently connect Metamask Wallet Accounts
    const getConnectedAccounts = async() => {
      if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
        try {
          // const accounts = await window.ethereum.request({method: 'eth_accounts'});
          const web3 = new Web3(window.ethereum)
          const accounts = await web3.eth.getAccounts();
          if(accounts.length > 0) {
            setWalletAddress(accounts[0]);
            const address = web3.utils.toChecksumAddress(accounts[0]).toLowerCase();
            const balanceInWei = await web3.eth.getBalance(address);
            const balanceInEth = Math.round(Number(web3.utils.fromWei(balanceInWei, 'ether')) * 1000) / 1000;
            setEtherBalance(balanceInEth)
          }else {
            // we've lost connection to the wallet
            setEtherBalance(0)
            console.log('Connect to Metamask')
          }
        }catch(e) {
          console.error(e)
        }
      } else {
        console.log('metamask is not installed')
      }
    }

  // Switch Account
  const swichAccountListener = () => {
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: any) => {
          setWalletAddress(accounts[0]);
      });
    } else {
      setWalletAddress('');
      setEtherBalance(0)
      console.log('metamask is not installed')
    }
  }

  // Get Trucated wallet address
  const getTrucatedWalletAddress = () => {
    return walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : `Connect Wallet`
  }

  return (
    <>
    <main>
    <div className='font-mono container m-auto p-8'>
       <button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline" onClick={connectWallet}>{getTrucatedWalletAddress()}</button>
       <div>
        <p className='text-2xl'>Welcome to My Ether Wallet</p>
        <div className='text-xl m-8 p-8'>
          <p>{`Ether Balance: ${etherBalance}`}</p>
          <p>{`Token Balance: `}</p>
        </div>
        <div className='text-l m-8 p-8 flex gap-5'>
          <button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Send Ether</button>
          <button className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Send Tokens</button>
        </div>
       </div>
    </div>
    </main>
    </>
  )
}
