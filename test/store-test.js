const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Store Contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    let Store;
    let hardhatStore;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
      Store = await ethers.getContractFactory("Store");
      [owner, addr1, addr2, addr3] = await ethers.getSigners();
      hardhatStore = await Store.deploy();
    })

    describe("Add Product", function () {
      it("Should add Product to the contract and check the adding result", async function () {
        const now = Math.floor(Date.now() / 1000);
     
        console.log(addr1.address)
        console.log(addr2.address)
        console.log(addr3.address)
        await hardhatStore.addProductToStore(
          'A', 'B', 'AA', 'BB', now, now + 10, 5, 0
        );
        const product = await hardhatStore.getProduct(1);
        expect(product[0]).to.equal(1);
        expect(product[1]).to.equal('A');
        expect(product[2]).to.equal('B');
        expect(product[3]).to.equal('AA');
        expect(product[4]).to.equal('BB');
        expect(product[5]).to.equal(now);
        expect(product[6]).to.equal(now + 10);
        expect(product[7]).to.equal(5);
        const prov = ethers.getDefaultProvider();
       
        expect(await hardhatStore.getProductNumber()).to.equal(1)
        await hardhatStore.connect(addr1).bid(1, 
          '6', 'test1', { value: 6 })
        await hardhatStore.connect(addr2).bid(1, 
          '7', 'test2', { value: 7 })
       
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(10000);
        await hardhatStore.connect(addr1).revealBid(1, '6', 'test1');
        await hardhatStore.connect(addr2).revealBid(1, '7', 'test2');
        const a = await hardhatStore.higheatBidderInfo(1);
        expect(a[0]).to.equal(addr2.address)
        expect(await hardhatStore.totalBids(1)).to.equal(2)

        await hardhatStore.connect(addr3).finalizaAuction(1)
        console.log(await hardhatStore.escrowAddressForProduct(1))
        // await hardhatStore.escrowInfo(1)
        console.log("Test is succeeful!")      
      
    })
    })
    
  });

});