# hardhat-auction-house
In the smart contract, we have a struct Product, and the <br />constructor to generate the productIndex (in the contract, <br /> constructor only run once, the init productIndex is 0,  <br />and each all addProduct, the productIndex will +1) <br />

The Product struct has id,name,img,desc,start time, end time,  <br />start price, highest Bidder, second highbidder(address), <br /> highestBid, second Highest bid, status(o,s,us), condition(new, used) <br />

## function: <br />
addProduct: addresses and bids are 0 at first time <br />
getProduct: return productIndex, name, img, desc, start time,  <br /> end time, start price, statu and condition. <br />

bid: using require, if now >=starttime,<=end time, bid value > start price and >=secondhighest bid <br /> if highestbid is 0, means this is the first bid, so secondbid = start price, highest  = the price you bid <br /> else, bid>highestbid, if 
second highestbid not =0, refund the secodn highest bid to second highest bider  <br /> and change the second high bider and bid as the previous high bid and bider. <br /> The msg.sender and msg.value become the highbidder and highbid. <br />
if msg.value=highest bid, or less than the highest bid but highest second bid, so return the previous second highestbid to second highestbidder , msg.sender is second highestbider and second highbid


