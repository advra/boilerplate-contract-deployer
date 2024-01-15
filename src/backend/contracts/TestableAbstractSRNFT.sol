// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./AbstractSRNFT.sol";

// This is an extension to expose methods for testing since things like
// checking baseUri or total minted can be difficult to test but
// adding additional methods can be unecessary in deployment

contract TestableAbstractSRNFT is AbstractSRNFT {
    // Constructor
    constructor() AbstractSRNFT() {
        // Constructor logic if needed
    }

    // New function to expose the _baseURI
    function baseURI() external pure returns (string memory) {
        return _baseURI();
    }
    
}