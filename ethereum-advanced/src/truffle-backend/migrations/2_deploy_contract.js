let ProductContract = artifacts.require("ProductContract");

module.exports = function (deployer) {
  deployer.deploy(
    ProductContract,
    "0x6333127A807AD6B102c82bB88a66d82e94a660a5"
  );
};
