// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @author Jonathan Liu
/// @title Week 7 HW Multisig Wallet
contract Wallet {
  address[] public approvers; 
  uint8 public quorum; 
  struct Transfer {
    uint256 id; 
    uint256 amount;
    address payable to;
    uint8 approvals;      // # of approvals this transfer has received
    bool sent; 
  }
  Transfer[] public transfers;
  mapping(address => mapping(uint256 => bool)) public approvals;
  constructor(address[] memory _approvers, uint8 _quorum) {
    approvers = _approvers;
    quorum = _quorum;
  }

  modifier onlyApprover() {
      bool allowed = false;
      for(uint256 i = 0; i < approvers.length; i++) {
        if(approvers[i] == msg.sender) {
          allowed = true;
        }
      }
      require(allowed == true, "Only approver allowed");
      _;
  }

  /// Gets the full list of approvers
  /// @dev create our own getter function to return entire approvers array
  /// @return array of approvers  
  function getApprovers() external view returns(address[] memory) {
    return approvers;
  }

  /// Creates Transfer struct 
  /// @param amount the value to send 
  /// @param to receipient 
  /// @dev simplify by using array of Transfers instead of mapping 
  function createTransfer(uint256 amount, address payable to) external onlyApprover {
    transfers.push(Transfer(
      transfers.length, 
      amount, 
      to, 
      0, 
      false
    ));
  }

  /// Gets the full list of transfers
  /// @dev create our own getter function to return entire Transfers array 
  /// @return Transfer array 
  function getTransfers() external view returns(Transfer[] memory) {
    return transfers; 
  }

  /// Approve transfers from multisig wallet to user wallet
  /// @param id of Transfer to process
  function approveTransfer(uint256 id) external onlyApprover {
    // business logic: scenarios to test for
    // particular approver has not approved this transfer in the past 
    require(approvals[msg.sender][id] == false, "You have approved this transfer already");
    // transfer has not already been sent
    require(transfers[id].sent == false, "Transfer has already been sent"); 

    // best practice: update state variables first before transferring any eth 
    approvals[msg.sender][id] = true;
    transfers[id].approvals++; 

    if(transfers[id].approvals >= quorum) {
      // update status
      transfers[id].sent = true;
      // create references
      address payable to = transfers[id].to; 
      uint256 amount = transfers[id].amount;
      to.transfer(amount);
    }
  }

  /// This function is called for plain Ether transfers, i.e. for every call with empty calldata.
  /// @dev send transaction to address of this smart contract with some ether in it and this function will be called.
  receive() external payable {} 
}
