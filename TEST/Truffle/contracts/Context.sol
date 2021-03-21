// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

//abstract contract Context {
contract Context {
    //function _msgSender() internal view virtual returns (address) {
    function _msgSender() internal view  returns (address) {
        return msg.sender;
    }
}
