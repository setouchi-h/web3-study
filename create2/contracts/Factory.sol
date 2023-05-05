// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Box.sol";

contract Factory {
    address[] public boxes;

    function deploy(uint256 _value, bytes32 _salt) external {
        Box newBox = new Box{salt: _salt}(_value);
        boxes.push(address(newBox));
    }

    function transferOwnership() external {
        Box(boxes[0]).transferOwnership(msg.sender);
    }

    function getBoxAddress(uint256 index) external view returns (address) {
        return boxes[index];
    }
}
