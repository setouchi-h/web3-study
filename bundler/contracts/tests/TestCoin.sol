//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TestCoin {
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;

    struct Struct {
        uint a;
        uint b;
        uint c;
    }

    mapping(address => Struct) public structInfo;

    function getInfo(address addr) public view returns (Struct memory) {
        return structInfo[addr];
    }

    function balanceOf(address addr) public view returns (uint) {
        return balances[addr];
    }

    function allowance(address owner, address spender) public view returns (uint) {
        return allowances[owner][spender];
    }

    function mint(address addr) public returns (uint) {
        return balances[addr] += 100;
    }

    //unrelated to token: testing inner object revert
    function reverting() public pure returns (uint) {
        revert("inner-revert");
    }

    function wasteGas() public pure returns (uint) {
        string memory buffer = "string to be duplicated";
        while (true) {
            buffer = string.concat(buffer, buffer);
        }
        return 0;
    }
}
