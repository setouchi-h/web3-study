// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IAyAyReceiver.sol";
import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAyAyWallet {
    function nonce() external view returns (uint256);

    function entryPoint() external view returns (IEntryPoint);

    function pay(IAyAyReceiver receiver, IERC20 token, uint256 amount) external;

    function getDeposit() external view returns (uint256);

    function addDeposit() external payable;

    function withdrawDepositTo(
        address payable withdrawAddress,
        uint256 amount
    ) external;
}
