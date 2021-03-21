pragma solidity 0.5.0;

contract Context {
    function _msgSender() internal view  returns (address) {
        return msg.sender;
    }
//calldata no funciona debe ser con memory para esta versión
    function _msgData() internal view  returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}