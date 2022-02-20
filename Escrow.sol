// pragma solidity 0.6.0;
pragma solidity 0.8.9;	
import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
// Defining a Contract
contract Escrow{

	// Declaring the state variables
	address payable public buyer;
	address payable public seller;
	address payable public arbiter;
	IRrpBeaconServer public immutable rrpBeaconServer;
	mapping(address => uint) TotalAmount;

	// Defining a enumerator 'State'
	enum State{

		// Following are the data members
		awate_payment, awate_delivery, complete
	}

	// Declaring the object of the enumerator
	State public state;
	
	// Defining function modifier 'instate'
	modifier instate(State expected_state){
		
		require(state == expected_state);
		_;
	}

// Defining function modifier 'onlyBuyer'
	modifier onlyBuyer(){
		require(msg.sender == buyer ||
				msg.sender == arbiter);
		_;
	}

	// Defining function modifier 'onlySeller'
	modifier onlySeller(){
		require(msg.sender == seller);
		_;
	}
	
	// Defining a constructor
	constructor(address payable _buyer,address payable _sender,address rrpBeaconServerAddress) public{
		require(rrpBeaconServerAddress != address(0), "Zero address");
        rrpBeaconServer = IRrpBeaconServer(rrpBeaconServerAddress);
		// Assigning the values of the
		// state variables
		arbiter = payable(msg.sender);
		buyer = _buyer;
		seller = _sender;
		state = State.awate_payment;
	}
	
	// Defining function to confirm payment
	function confirm_payment() onlyBuyer instate(
	State.awate_payment) public payable{
	
		state = State.awate_delivery;
		
	}
	
	// Defining function to confirm delivery
	function confirm_Delivery() onlyBuyer instate(
	State.awate_delivery) public{
		bytes32 beaconId = 0x396d166d7dfdc87e317e7edb826c617324d3a0c770ab64b12e4a5ed8f4496e8d;
		int224 value;
		uint256 timestamp;
		(value, timestamp) = rrpBeaconServer.readBeacon(beaconId);
		if(value <= 1200000){
			seller.transfer(address(this).balance);
			state = State.complete;
		}
	}

	// Defining function to return payment
	function ReturnPayment() onlySeller instate(
	State.awate_delivery)public{	
	buyer.transfer(address(this).balance);
	}	
	
	function readBeacon(bytes32 beaconId)
        external
        view
        returns (int224 value, uint256 timestamp)
    {
        (value, timestamp) = rrpBeaconServer.readBeacon(beaconId);
    }
}
