const { expect } = require("chai");
// const { ethers } = require("hardhat");
const hre = require("hardhat");


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

  const NEW_URI = "ipfs://S0M3R4ND0MURI873489893uiruiru8938933r/"
  const NOT_REVEALED_URI = "ipfs://QmR6i5CyVbcqmqbdh6Db4Xu3ZRGbWJGnYCstG4B8SSgoy6";

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners();
    // Get contract factories
    // then Deploy the contract

    // Note: Use testable contract for testing purposes
    // abstractSRNFTFactory = await ethers.getContractFactory("AbstractSRNFT");
    // nft = await abstractSRNFTFactory.deploy();

    testableContract = await hre.ethers.getContractFactory("TestableAbstractSRNFT");
    nft = await testableContract.deploy(owner.address);

  });

  describe("Deployment", function () {
    it("Should have parameter be the designated owner", async function () {
      // This test expects contract owner to be passed parameter
      expect(await nft.owner()).to.equal(owner.address);
    });


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

    it("Should initally be unrevealed", async function () {
      const isRevealed = await nft.isRevealed();
      expect(isRevealed).to.equal(false);
    });

    it("Should have correct initial base URI", async function () {
      const baseURI = await nft.baseURI();
      expect(baseURI).to.equal('');
    });

    it("Should be able to change base URI", async function () {
      await nft.setBaseURI(NEW_URI);
      const baseURI = await nft.baseURI();
      expect(baseURI).to.equal(NEW_URI);
    });

  });

  describe("Revealing", function () {

    it("Should toggle if owner", async function () {
      await nft.connect(owner).setBaseURI(NEW_URI);
      await nft.connect(owner).toggleIsRevealed();
      const baseURI = await nft.baseURI();
      expect(baseURI).to.equal(NEW_URI);
    });

    it("Should not toggle if not owner", async function () {
      await nft.connect(owner).setBaseURI(NEW_URI);
      await expect(nft.connect(addr1).toggleIsRevealed()).to.be.reverted;
    });

    it("Should not toggle if base uri is not set", async function () {
      // Assuming 'owner' is the owner of the contract and 'nft' is your contract instance
      // The 'toggleIsRevealed' function should fail because the base URI is not set
      await expect(nft.connect(owner).toggleIsRevealed())
        .to.be.revertedWithCustomError(nft, "BaseURINotSet"); // Correct syntax for expecting a revert with a custom error
    });

    it("Should try to reveal with unset baseURI will revert", async function () {
      await expect(nft.connect(owner).toggleIsRevealed()).to.be.revertedWithCustomError(nft, "BaseURINotSet");
    });

    it("Should try to reveal with set baseURI will succeed", async function () {
      await nft.connect(owner).setBaseURI(NOT_REVEALED_URI);
      await expect(nft.toggleIsRevealed()).not.to.be.reverted;
    });

    it("Should not show tokenURI when not revealed", async function () {
      const pricePerNFT = await nft.PRICE_PER_NFT(); // Await the promise
      await nft.connect(addr1).mint(1, { value: pricePerNFT }); // Use the resolved BigNumber
      expect(await nft.tokenURI(1)).to.equal(await nft.NOT_REVEALED_URI());
    });

    it("Should show tokenURI when revealed", async function () {
      const baseURI = "https://example.com/";
      await nft.connect(owner).setBaseURI(baseURI);
      await nft.toggleIsRevealed();
    
      const pricePerNFT = await nft.PRICE_PER_NFT(); // Await the promise
      await nft.connect(addr1).mint(1, { value: pricePerNFT }); // Use the resolved BigNumber
      
      const expectedURI = baseURI + "1.json";
      expect(await nft.tokenURI(1)).to.equal(expectedURI);
    });

  });

  describe("Minting", function () {
    it("Should mint single NFT", async function () {
      const pricePerNFT = await nft.PRICE_PER_NFT();
      const mintPrice = pricePerNFT;
      await nft.connect(addr1).mint(1, { value: mintPrice });

      expect(await nft.balanceOf(addr1)).to.equal(1);
    });

    it("Should mint multiple NFTs in a batch", async function () {
      // Note: price from contract is of type BigInt
      const pricePerNFT = await nft.PRICE_PER_NFT();
      console.log("Type: " + typeof(pricePerNFT) + " " + pricePerNFT);
      const batchQuantity = BigInt(5);
      console.log("Type: " + typeof(batchQuantity) + " " + batchQuantity);
      // Convert batchQuantity to a string to use with parseUnits
      const mintPrice = batchQuantity * pricePerNFT;
      console.log("Type: " + typeof(mintPrice) + " " + mintPrice);
      await nft.connect(addr1).mint(batchQuantity, { value: mintPrice });

      expect(await nft.balanceOf(addr1.address)).to.equal(batchQuantity);
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
      const priceForOneNFT = await nft.PRICE_PER_NFT();
      await nft.connect(addr1).mint(1, { value: priceForOneNFT });
    });

    it("Should assign ownership of minted NFTs", async function () {
      expect(await nft.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should transfer NFTs between accounts", async function () {
      await nft.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
      expect(await nft.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should fail when trying to transfer an NFT not owned", async function () {
      await expect(nft.connect(addr2).transferFrom(addr1.address, addr2.address, 1)).to.be.reverted;
    });
  });

  // Additional tests for any other functionalities like access control, updates to base URI, etc.
});
