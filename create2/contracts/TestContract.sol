// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TestContract {
    address public owner;
    uint public foo;

    constructor(address _owner, uint _foo) {
        owner = _owner;
        foo = _foo;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
