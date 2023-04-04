// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Product {
    uint256 public immutable i_data;

    constructor(uint256 data) {
        i_data = data;
    }
}