pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakeToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("StakeToken", "STK") {
    _mint(msg.sender, initialSupply);
  }
}