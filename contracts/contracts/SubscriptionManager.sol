// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionManager is Ownable {
    struct Subscription {
        uint256 expiry;
        uint256 level;
    }

    mapping(address => Subscription) public subscriptions;
    mapping(bytes32 => bytes32) public contentRegistry; // Mapping from content hash to data hash for verification

    event SubscriptionRenewed(
        address subscriber,
        uint256 expiry,
        uint256 level
    );
    event ContentRegistered(
        bytes32 indexed dataHash,
        string cryptocurrency,
        string eventType,
        string actionType
    );
    event Withdrawn(uint256 amount);

    constructor() {
        // Initialize fees for each subscription level
        // Placeholder values; set these according to actual business logic
        fees[1] = 0.1 ether; // Market Mover Alert
        fees[2] = 0.2 ether; // Community Insights
        fees[3] = 0.5 ether; // Strategic Advisory
        fees[4] = 1 ether; // Enterprise API
    }

    mapping(uint256 => uint256) public fees;

    function setFee(uint256 level, uint256 fee) external onlyOwner {
        fees[level] = fee;
    }

    function subscribe(uint256 level) external payable {
        require(level >= 1 && level <= 4, "Invalid subscription level");
        require(msg.value == fees[level], "Incorrect value sent");
        subscriptions[msg.sender] = Subscription(
            block.timestamp + 30 days,
            level
        );
        emit SubscriptionRenewed(
            msg.sender,
            subscriptions[msg.sender].expiry,
            level
        );
    }

    function registerContent(
        string memory cryptocurrency,
        bytes32 dataHash,
        string memory eventType,
        string memory actionType,
        bytes32 contentHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address expectedSigner
    ) public {
        require(
            subscriptions[msg.sender].expiry > block.timestamp,
            "Subscription expired"
        );
        // This recreates the signed message hash from the content hash and checks signature.
        bytes32 message = keccak256(abi.encodePacked(contentHash));
        require(
            ecrecover(message, v, r, s) == expectedSigner,
            "Invalid signature"
        );

        contentRegistry[contentHash] = dataHash;
        emit ContentRegistered(dataHash, cryptocurrency, eventType, actionType);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Failed to withdraw");
        emit Withdrawn(balance);
    }

    function checkSubscription(
        address user
    ) external view returns (uint256 expiry, uint256 level) {
        return (subscriptions[user].expiry, subscriptions[user].level);
    }

    function isContentRegistered(
        bytes32 contentHash
    ) external view returns (bool) {
        return contentRegistry[contentHash] != bytes32(0);
    }
}
