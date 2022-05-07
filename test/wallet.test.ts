// test/wallet.test.js
// reference: https://docs.openzeppelin.com/learn/writing-automated-tests

// load dependencies 
// Chai is a BDD / TDD assertion library for node  
const { expect } = require('chai');

// start test block 
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Wallet', function () {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(async function(this: any) {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
        this.Wallet = await ethers.getContractFactory('Wallet');
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(async function(this: any) {
        this.wallet = await this.Wallet.deploy(); 
        await this.wallet.deployed();
    }); 

    // what do I want to test? 
    // happy and unhappy paths or succeeed and failing assertions
    // each describe block represents a set of tests 

    // test case
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('Number of approvers is the correct number', async function(this: any) {
        await this.wallet.store(3);

        // test if the returned value is the same one
        // note that we need to use strings to compare the 256 bit integers
        expect((await this.wallet.retrieve()).toString()).to.equal('3');
    });
});