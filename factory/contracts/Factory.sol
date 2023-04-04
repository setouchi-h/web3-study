// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Product.sol";

contract Factory {
    address[] public products;
    
    function deploy(uint256 _data) public {
        Product newProduct = new Product(_data);
        products.push(address(newProduct));
    }

    function getAddress(uint256 _index) external view returns (address) {
        return products[_index];
    }

    function getLength() external view returns (uint) {
        return products.length;
    }
}

