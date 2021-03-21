pragma solidity 0.5.0;

contract IDAPP {
    /*
     * Las características propias de los drones
	 * Un identificador único y ascendente, comenzando en 1 y que no puede repetirse
     */
	//El contrato DAPP implementa un mapping (bytes32 => Dron) drones para almacenar la struct

	struct Dron {
		address _company; // Necesario para aplicar un require address = empresa ¿?
	    uint256 _altitudeMax;
		uint256 _altitudeMin;
		uint256 _costValue; //Es un valor generico, utilizado en la la operacion solicitud/pedido y pago del servicio de fumigacion
		string _pesticide;
		string _name;
		bool _isActive;
    }
    
    function getCountDron() external view returns (uint256 );
	function setCountDron() external  returns (bool );
	function _setDron(address company_, uint256 idDron_, uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_, string memory pesticide_, string memory name_) internal returns (bool );
	event eventSetDronOk(uint256 idDron_, uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_);
	function getDron(uint256 idDron_) external view returns (address company_, uint256 idDron,  uint256 altitudeMax_, uint256 altitudeMin_, uint256 costValue_ ,string memory pesticide_, string memory name_, bool isActive_);
	/*
     * Las características propias de las parcelas
	 * Un identificador único y ascendente, que comienza en 1 y que no puede repetirse
     */
	//El contrato DAPP implementa un mapping (bytes32 => Land) drones para almacenar la struct
	struct Land {
	    uint256 _altitudeMax;
		uint256 _altitudeMin;
		string _name;
		address _customer;
		string _pesticide;
    }
    function getCountLand() external view returns (uint256 );
	function setCountLand() external  returns (bool );
	function getIdLand(uint256 idLand_) external view returns (string memory pesticide_, uint256 altitudeMax_, uint256 altitudeMin_);
	function _setLand(uint256 idLand_, uint256 altitudeMax_, uint256 altitudeMin_,  address customer_, string memory _pesticide_, string memory name_) internal  returns (bool );
	event eventSetLandOk(uint256 idLand_, uint256 altitudeMax_, uint256 altitudeMin_, string name_);
	function getLand(uint256 idLand_) external view returns (address customer_, uint256 idLand,  uint256 altitudeMax_, uint256 altitudeMin_, string memory pesticide_, string memory name_);
	
	//El contrato DAPP implementa un mapping (bytes32 => Paid) paids para almacenar la struct
	//El grupo de funciones a continucion describen la operacion pago del servicio de fumigacion
	struct Paid {
        uint256 _idDron;
        uint256 _idLand;
		address _idCostumer;
		uint256 _value;
    }
    function _setPay(bytes8 purchase_, uint256 _idDron, uint256 _idLand, address _idCostumer, uint256 _value) internal  returns (bool );
	event eventSetPaidOk(uint256 _idDron, uint256 _idLand, address _idCostumer, uint256 _value, bytes8 purchase_);
	
}