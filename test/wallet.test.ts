// test/wallet.test.js
// reference: https://docs.openzeppelin.com/learn/writing-automated-tests

// load dependencies 
// Chai is a BDD / TDD assertion library for node  
const { expect } = require('chai');

// start test block 
describe('Wallet', function () {
    before(async function () {
        this.Wallet = await ethers.getContractFactory('Wallet');
    });

    beforeEach(async function () {
        this.wallet = await this.Wallet.deploy(); 
        await this.wallet.deployed();
    }); 

    // what do I want to test? 
    // happy and unhappy paths or succeeed and failing assertions
    // each describe block represents a set of tests 

    // test case
    it('Number of approvers is the correct number', async function () {
        await this.wallet.store(3);

        // test if the returned value is the same one
        // note that we need to use strings to compare the 256 bit integers
        expect((await this.wallet.retrieve()).toString()).to.equal('3');
    });
});