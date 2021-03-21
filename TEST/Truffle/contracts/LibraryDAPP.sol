pragma solidity ^0.5.0;

import "./IDAPP.sol";

library LibraryDAPP {
    	//drones[idDron_]._company = company_;
    function indexOf( mapping(uint256 => IDAPP.Dron)  storage drones, uint256 max_, uint256 min_, string memory pesticide_) internal view returns (uint256 IDDron_) {
       IDDron_ = 0 ;
       for (uint i = 0; i < 100; i++){
    if (keccak256(bytes(drones[i]._pesticide)) == keccak256(bytes(pesticide_))) {
       if (drones[i]._isActive == true) {
            if ( max_ <= drones[i]._altitudeMax) {
                if (  min_ >= drones[i]._altitudeMin) {
                IDDron_ = i; break;
                }
            }
       }
       }
    }
    
}

}