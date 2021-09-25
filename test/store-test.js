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
     
        
        
        await hardhatStore.connect(owner).addProductToStore(
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
        const q = await ethers.utils.parseEther("6")
        const w = await ethers.utils.parseEther("7")
        const e = await ethers.utils.parseEther("8")
        const r = await ethers.utils.parseEther("9")
        await hardhatStore.connect(addr1).bid(1, { value: q })
        await hardhatStore.connect(addr2).bid(1, { value: w })
        await hardhatStore.connect(addr1).bid(1, { value: e })
        await hardhatStore.connect(addr2).bid(1, { value: r })
       
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(10000);
        const a = await hardhatStore.higheatBidderInfo(1);
        expect(a[0]).to.equal(addr2.address)

        await hardhatStore.connect(owner).finalizaAuction(1)
        //console.log(await hardhatStore.escrowAddressForProduct(1))
        // await hardhatStore.escrowInfo(1)
        const b = await hardhatStore.getWinner(1)
        expect(b[0]).to.equal(addr2.address)
        expect(b[1]).to.equal(await ethers.utils.parseEther("9"))
        let s = await ethers.provider.getBalance(addr1.address)
        console.log(ethers.utils.formatEther(s))
        s = await ethers.provider.getBalance(addr2.address)
        console.log(ethers.utils.formatEther(s))
        console.log("Test is succeeful!")      
      
    })
    })
    
  });

});