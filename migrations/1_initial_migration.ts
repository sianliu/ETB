// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'artifacts'.
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer: any) {
  deployer.deploy(Migrations);
};
