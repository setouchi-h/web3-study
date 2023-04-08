// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";

contract GetUserOpHash {
    error UserOpHashesResult(bytes32[] userOpHashes);

    constructor(IEntryPoint entryPoint, UserOperation[] memory userOps) {
        revert UserOpHashesResult(getUserOpHashes(entryPoint, userOps));
    }

    function getUserOpHashes(
        IEntryPoint entryPoint,
        UserOperation[] memory userOps
    ) public view returns (bytes32[] memory ret) {
        ret = new bytes32[](userOps.length);
        for (uint i = 0; i < userOps.length; i++) {
            ret[i] = entryPoint.getUserOpHash(userOps[i]);
        }
    }
}

contract GetCodeHashes {
    error CodeHashesResult(bytes32 hash);

    function getCodeHashes(
        address[] memory addresses
    ) public view returns (bytes32) {
        bytes32[] memory hashes = new bytes32[](addresses.length);
        for (uint i = 0; i < addresses.length; i++) {
            hashes[i] = addresses[i].codehash;
        }
        bytes memory data = abi.encode(hashes);
        return (keccak256(data));
    }
}
