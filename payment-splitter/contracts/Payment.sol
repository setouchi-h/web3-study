// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract Payment is PaymentSplitter {
    constructor(
        address[] memory _payees,
        uint256[] memory _shares
    ) payable PaymentSplitter(_payees, _shares) {}
}
