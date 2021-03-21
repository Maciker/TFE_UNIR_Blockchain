//Sistema de fumigación parcelas con drones

pragma solidity ^0.5.0;

import "./IDAPP.sol";
import "./LibraryDAPP.sol";

contract DAPP is IDAPP {
    
    /*
     * Las características propias de los drones
	 * Un identificador único y ascendente, comenzando en 1 y que no puede repetirse
     */
	//El contrato DAPP implementa un mapping (bytes32 => Dron) drones para almacenar la struct
	uint256 private _idLand;
	uint256 private _idDron;
	address private _owner;
	
	mapping(uint256 => Dron) private drones;

	constructor() public{
		_idDron=1;
		_idLand=1;
		_owner=msg.sender;
	}
	
	modifier onlyOwner() {
		require( msg.sender == _owner, "Solo la empresa propietaria de los drones puede hacer esta acción.");
		_;
	}

	// Retorna el ultimo IDdron
    function getCountDron() external view returns (uint256) {
        return _idDron;
	}

	// Incrementa IDdron
	function setCountDron() external onlyOwner returns (bool) {
		_idDron ++;
		return true;
	}

	// Dron set!
	function setDron(address company_, uint256 idDron_, uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_, string memory pesticide_, string memory name_) public onlyOwner returns  (bool) {
		_setDron(company_, idDron_, altitudeMax_, altitudeMin_, costValue_, pesticide_, name_);
		return true;
	}
	function _setDron(address company_, uint256 idDron_, uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_, string memory pesticide_, string memory name_) internal  returns  (bool) {
		drones[idDron_]._company = company_;
		drones[idDron_]._altitudeMax = altitudeMax_;
		drones[idDron_]._altitudeMin = altitudeMin_;
		drones[idDron_]._costValue = costValue_;
		drones[idDron_]._pesticide = pesticide_;
		drones[idDron_]._name = name_;
		drones[idDron_]._isActive = true;
		emit eventSetDronOk(idDron_, altitudeMax_, altitudeMin_,  costValue_);
		return true;
	}
	
	function getDron(uint256 idDron_) external view returns (address company_,  uint256 idDron, uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_ ,string memory pesticide_, string memory name_, bool isActive_){
	    company_ = drones[idDron_]._company ;
		altitudeMax_ = drones[idDron_]._altitudeMax ;
		altitudeMin_ = drones[idDron_]._altitudeMin ;
		costValue_ = drones[idDron_]._costValue;
		pesticide_ = drones[idDron_]._pesticide ;
		name_ = drones[idDron_]._name ;
		isActive_ = drones[idDron_]._isActive;
		idDron = idDron_;
	}

	/*
     * Las características propias de las parcelas
	 * Un identificador único y ascendente, que comienza en 1 y que no puede repetirse
     */
	//El contrato DAPP implementa un mapping (bytes32 => Land) drones para almacenar la struct
	mapping(uint256 => Land) private lands;

	// Retorna el ultimo ultimo IDParcela
    function getCountLand() external view returns (uint256) {
		return _idLand;
	}

	// Sumamos uno al contador de parcelas
	function setCountLand() external onlyOwner returns (bool) {
		_idLand ++;
		return true;
	}

	// Land set!!
	function setLand(uint256 idLand_, uint256 altitudeMax_, uint256 altitudeMin_, address customer_, string memory pesticide_, string memory name_) public onlyOwner returns (bool) {
	_setLand(idLand_, altitudeMax_, altitudeMin_, customer_, pesticide_, name_);
	return true;
	}
	
	function _setLand(uint256 idLand_, uint256 altitudeMax_, uint256 altitudeMin_, address customer_, string memory pesticide_, string memory name_) internal  returns (bool) {
		lands[idLand_]._altitudeMax = altitudeMax_;
		lands[idLand_]._altitudeMin = altitudeMin_;
		lands[idLand_]._customer = customer_;
		lands[idLand_]._name = name_;
		lands[idLand_]._pesticide = pesticide_;
		emit eventSetLandOk(idLand_, altitudeMax_, altitudeMin_,name_);
		return true;
	}
	
		function getIdLand(uint256 idLand_) external view returns (string memory pesticide_, uint256 altitudeMax_, uint256 altitudeMin_) {
		altitudeMax_ = lands[idLand_]._altitudeMax ;
		altitudeMin_ = lands[idLand_]._altitudeMin;
		pesticide_ = lands[idLand_]._pesticide ;
		//return ;
	}
	
	function getLand(uint256 idLand_) external view returns (address customer_, uint256 idLand,  uint256 altitudeMax_, uint256 altitudeMin_, string memory pesticide_, string memory name_){
	    customer_ = lands[idLand_]._customer ;
		altitudeMax_ = lands[idLand_]._altitudeMax ;
		altitudeMin_ = lands[idLand_]._altitudeMin ;
		pesticide_ = lands[idLand_]._pesticide ;
		name_ = lands[idLand_]._name ;
		idLand = idLand_;
	}


	//El contrato DAPP implementa un mapping (bytes32 => Paid) paids para almacenar la struct
	//El grupo de funciones a continucion describen la operacion pago del servicio de fumigacion
	mapping (bytes8 => Paid) private payments;
	
	function setPay(bytes8 purchase_, uint256 idDron_, uint256 idLand_, address idCostumer_, uint256 value_) public onlyOwner returns(bool) {
		_setPay(purchase_, idDron_, idLand_, idCostumer_, value_);
		return true;
	}
	
   	function _setPay(bytes8 purchase_, uint256 idDron_, uint256 idLand_, address idCostumer_, uint256 value_) internal onlyOwner returns(bool) {
		//adiciona un require que valide el by_ no exista en payments
		payments[purchase_]._idDron = idDron_;
		payments[purchase_]._idLand = idLand_;
		payments[purchase_]._idCostumer = idCostumer_;
		payments[purchase_]._value = value_;
		
		//inactivo el dron porque esta en ejecutando el servicio de fumigacion
		drones[idDron_]._isActive = false;

		emit eventSetPaidOk( idDron_,  idLand_,  idCostumer_,  value_, purchase_);
		return true;
	}

	function getDronAvailable(uint256 max_, uint256 min_, string memory  pesticide_) public  view returns (uint256 IDDron_,uint256 altitudeMax_,uint256 altitudeMin_, uint256 costValue_){
	   IDDron_= LibraryDAPP.indexOf(drones,max_, min_, pesticide_);
	   altitudeMax_ = drones[IDDron_]._altitudeMax ;
	   altitudeMin_ = drones[IDDron_]._altitudeMin ;
	   costValue_ = drones[IDDron_]._costValue ;
	}
	
}