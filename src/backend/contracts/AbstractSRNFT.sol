// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@solady/contracts/token/ERC721/ERC721.sol";
import "erc721a/contracts/ERC721A.sol";

/**
 * Cannot action exceeds max supply
 */
error ExceedsMaxSupply();
error NotEnoughFunds();

contract AbstractSRNFT is ERC721A {
    uint16 public constant MAX_SUPPLY = 8888;
    uint256 public constant PRICE_PER_NFT = 0.001 ether;
    uint256 private _currentTokenId = 0;

    constructor() ERC721A("AbstractSpaceRiders", "SR") {}

    function mint(uint256 quantity) public payable {
        if(_totalMinted() + quantity > MAX_SUPPLY) {
            revert ExceedsMaxSupply();
        }
        if(msg.value < PRICE_PER_NFT * quantity) {
            revert NotEnoughFunds();
        }
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal pure override returns (string memory) {
        return 'ipfs://Qma8e3QrAWVg4buufjUyLjFbjWJ7PKKNzehAct7kxgDFT6/';
    }

}