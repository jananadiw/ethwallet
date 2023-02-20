const METoken = artifacts.require("METoken");

module.exports = (deployer) => {
    deployer.deploy(METoken, "METoken", "MET", 100000);
};