async function main() {
  const [deployer, addr1, addr2] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Store = await ethers.getContractFactory("Store");
  const store = await Store.deploy();

  console.log("Store address:", store.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });