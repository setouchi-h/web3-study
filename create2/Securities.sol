// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

error Securities__NonTransferrable();
error Securities__InvalidId(uint256 id);
error Securities__NonTransferable();

contract Securities is ERC1155, ERC1155Supply, Ownable, Pausable {
    address[] private s_holders;

    event MintToken(address indexed to, uint256 id, uint256 amount);

    constructor(string memory _uri) ERC1155(_uri) {}

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 amount) public onlyOwner {
        if (!isAddressInArray(s_holders, msg.sender)) {
            s_holders.push(msg.sender);
        }
        _mint(msg.sender, 0, amount, "");
    }

    function isAddressInArray(address[] memory array, address element) private pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return true;
            }
        }
        return false;
    }

    function balanceOf(address account) public view returns (uint256) {
        return super.balanceOf(account, 0);
    }

    function balanceOfAll() external view returns (uint256) {
        uint256 balance = 0;
        for (uint256 holderIndex = 0; holderIndex < s_holders.length; holderIndex++) {
            address holder = s_holders[holderIndex];
            balance += balanceOf(holder);
        }
        return balance;
    }

    // Non transferable

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal pure override(ERC1155, ERC1155Supply) {
        revert Securities__NonTransferrable();
    }

    function _afterTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        revert Securities__NonTransferable();
    }

    function setApprovalForAll(address operator, bool approved) public override {
        revert Securities__NonTransferable();
    }

    // getter

    function getHolders() external view returns (address[] memory) {
        return s_holders;
    }
}
