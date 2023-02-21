// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EtherTransfer {
    function transferEther(address payable recipient, uint256 amount) public {
        require(address(this).balance >= amount, "Insufficient balance in the contract.");
        recipient.transfer(amount);
    }
}