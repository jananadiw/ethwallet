// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract METoken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint initialSupply
    ) ERC20(name, symbol) {
        require(initialSupply > 0, "Initial supply has to be greater than 0");
        _mint(msg.sender, initialSupply * 10**18);
    }

    function getBalance(ERC20 token, address walletAddress) public view returns (uint256) {
        uint256 tokenBalance = token.balanceOf(walletAddress);

        return tokenBalance;
    }

    function transferTokens(address recipient, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance.");
        _transfer(msg.sender, recipient, amount);
    }
}