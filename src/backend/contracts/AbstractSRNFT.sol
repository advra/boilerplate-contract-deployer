// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@solady/contracts/token/ERC721/ERC721.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Action cannot exceeds max supply
 */
error ExceedsMaxSupply();

/**
 * Action lacks funds
 */
error NotEnoughFunds();

/**
 * Action invalid due to BaseURINotSet
 */
error BaseURINotSet();

/**
 * Action invalid due to max mint for address reached for address
 */
error MaxMintAmountExceeded();

contract AbstractSRNFT is ERC721A, Ownable {
    uint16 public constant MAX_SUPPLY = 8888;
    uint8 public constant MAX_MINT_AMOUNT = 5;
    uint256 public constant PRICE_PER_NFT = 0.0001 ether;
    string public constant NOT_REVEALED_URI = "ipfs://QmR6i5CyVbcqmqbdh6Db4Xu3ZRGbWJGnYCstG4B8SSgoy6";
    string public baseURI;
    bool public isRevealed = false;

    constructor(address initialOwner) ERC721A("AbstractSpaceRiders", "SR") Ownable(initialOwner) {
        
    }

    function mint(uint256 quantity) public payable mustPassChecks(quantity) {
        _mint(msg.sender, quantity);
    }

    /**
     * ERC721A
     *  SpaceRiders begins at Space Riders #1
     */
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }


    /**
     * ERC721A
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /* ERC721A
     * Normal behavior returns the following: 
     *       ipfs://Qma8e3QrAWVg4buufjUyLjFbjWJ7PKKNzehAct7kxgDFT6/0
     * But we are using Space Riders deployed metadata which returns ".json" 
     * at the end which requires this format: 
     *       ipfs://Qma8e3QrAWVg4buufjUyLjFbjWJ7PKKNzehAct7kxgDFT6/0.json
    */ 
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        if (isRevealed == false) {
            return NOT_REVEALED_URI;
        }
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId), '.json')) : '';
    }

    /*
     * Custom function for revealing 
     */
    function toggleIsRevealed() public onlyOwner {
        if (!isRevealed && bytes(baseURI).length == 0) revert BaseURINotSet();
        isRevealed = !isRevealed;
    }

    /*
     * Custom function for setting baseUri 
     */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    /*
     * Custom function to pass checks for mint
     */ 
    modifier mustPassChecks(uint256 _quantity) {
        if(_totalMinted() + _quantity > MAX_SUPPLY) {
            revert ExceedsMaxSupply();
        }
        if(_numberMinted(msg.sender) + _quantity > MAX_MINT_AMOUNT) {
            revert MaxMintAmountExceeded();
        }
        // Separate check for owner
        if (msg.sender == owner()) {
            // Owner-specific logic (if any)
        } else {
            // Check for regular users
            if (msg.value < PRICE_PER_NFT * _quantity) {
                revert NotEnoughFunds();
            }
        }
        _;
    }
}