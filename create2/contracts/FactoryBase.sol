// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./TestContract.sol";

contract FactoryBase {
    function deploy(
        address _owner,
        uint _foo,
        bytes32 _salt
    ) public payable returns (TestContract) {
        // This syntax is a newer way to invoke create2 without assembly, you just need to pass salt
        // https://docs.soliditylang.org/en/latest/control-structures.html#salted-contract-creations-create2
        return new TestContract{salt: _salt}(_owner, _foo);
    }

    function getValue() external pure returns (uint256) {
        return 1;
    }
}
