const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AbstractSRNFT", function () {

  const nftName = "AbstractSpaceRiders"
  const nftSymbol = "SR"
  
  // let abstractSRNFTFactory;
  let testableContract;
  let nft;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    // Get contract factories
    // then Deploy the contract

    // Note: Use testable contract for testing purposes
    // abstractSRNFTFactory = await ethers.getContractFactory("AbstractSRNFT");
    // nft = await abstractSRNFTFactory.deploy();

    testableContract = await ethers.getContractFactory("TestableAbstractSRNFT");
    nft = await testableContract.deploy();

  });

  describe("Deployment", function () {
    it("Should track name and symbol of the nft collection", async function () {
      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should assign the total supply of NFTs", async function () {
      const totalSupply = await nft.MAX_SUPPLY();
      expect(totalSupply).to.equal(8888);
    });

    it("Should have correct base URI", async function () {
      const baseURI = await nft.baseURI();
      expect(baseURI).to.equal("ipfs://Qma8e3QrAWVg4buufjUyLjFbjWJ7PKKNzehAct7kxgDFT6/");
    });
  });

  describe("Minting", function () {
    it("Should mint single NFT", async function () {
      await nft.connect(addr1).mint(1);
      expect(await nft.balanceOf(addr1)).to.equal(1);
    });

    it("Should mint multiple NFTs in a batch", async function () {
      const batchQuantity = 5;
      await nft.connect(addr2).mint(batchQuantity);
      expect(await nft.balanceOf(addr2)).to.equal(batchQuantity);
    });

    it("Should not allow minting more than max supply", async function () {
      const maxSupply = await nft.MAX_SUPPLY();
      // note: maxsupply is bigint
      const mintAttempt = maxSupply + BigInt(1); 
      await expect(nft.connect(addr1).mint(mintAttempt)).to.be.revertedWithCustomError(nft, "ExceedsMaxSupply");
    });

    it("Should not allow minting of zero quantity", async function () {
      await expect(nft.connect(addr1).mint(0)).to.be.revertedWithCustomError(nft, "MintZeroQuantity");
    });
  });

  describe("Ownership and Transfers", function () {
    beforeEach(async function () {
      await nft.connect(addr1).mint(1);
    });

    it("Should assign ownership of minted NFTs", async function () {
      expect(await nft.ownerOf(0)).to.equal(addr1.address);
    });

    it("Should transfer NFTs between accounts", async function () {
      await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      expect(await nft.ownerOf(0)).to.equal(addr2.address);
    });

    it("Should fail when trying to transfer an NFT not owned", async function () {
      await expect(nft.connect(addr2).transferFrom(addr1.address, addr2.address, 0)).to.be.reverted;
    });
  });

  // Additional tests for any other functionalities like access control, updates to base URI, etc.
});
