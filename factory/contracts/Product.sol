// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Product {
    uint256 private immutable i_data;

    constructor(uint256 data) {
        i_data = data;
    }

    function getData() view external returns (uint256) {
        return i_data;
    }
}