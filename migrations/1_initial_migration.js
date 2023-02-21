const METoken = artifacts.require('METoken');
const EtherTransfer = artifacts.require('EtherTransfer');

module.exports = async (deployer) => {
    await deployer.deploy(METoken, 'METoken', 'MET', 100000);
    await deployer.deploy(EtherTransfer);
};
