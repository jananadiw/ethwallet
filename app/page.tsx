import Image from 'next/image'
let Web3 = require('web3');

export default function Home() {
  let web3 = new Web3('http://localhost:7545');
  web3.eth.getAccounts(console.log);
  return (
    <main>
      <div>
       <p>Welcome to Wallet</p>
      </div>
    </main>
  )
}
