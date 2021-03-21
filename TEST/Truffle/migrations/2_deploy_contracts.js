var DAPP = artifacts.require("./DAPP.sol");

module.exports = function(deployer) {
    deployer.deploy(DAPP);
};