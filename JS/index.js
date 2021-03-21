console.log("start index.js");

var countIdDron='x';
var countIdLand='x';

var gasDapp = 672197;//5

var addressProviderDAPP, addressProviderOwnerERC20, addressProviderOwnerDron, addressProviderOwnerLand, addressProviderOperatorDron, addressCustomerOperator, addressProviderServicePaid;
var web3ContractERC721Dron, web3ContractERC721Land, web3ContractERC20, web3ContractDapp ;

var contractDapp ='0x787b48Eaaef4201dB23A15aA67d911EC21649B90';
var contractERC721Dron ='0x2ADFAFD1b93Bcaaac626a90c4d3ce5AEfF67F8b2';
var contractERC721Land ='0x76656915Eef4D63d9Cca58E6444019c630f86d11';
var contractERC20 ='0xdE0605915E9c618C654Ee9aF9993b608a4284BFA';

var abiDapp = [{"constant":false,"inputs":[],"name":"setCountLand","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"company_","type":"address"},{"name":"idDron_","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"costValue_","type":"uint256"},{"name":"pesticide_","type":"string"},{"name":"name_","type":"string"}],"name":"setDron","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCountDron","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"max_","type":"uint256"},{"name":"min_","type":"uint256"}],"name":"originalgetDronAvailable","outputs":[{"name":"IDDron_","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"costValue_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setCountDron","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCountLand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"idDron_","type":"uint256"}],"name":"getDron","outputs":[{"name":"company_","type":"address"},{"name":"idDron","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"costValue_","type":"uint256"},{"name":"pesticide_","type":"string"},{"name":"name_","type":"string"},{"name":"isActive_","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"max_","type":"uint256"},{"name":"min_","type":"uint256"},{"name":"pesticide_","type":"string"}],"name":"getDronAvailable","outputs":[{"name":"IDDron_","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"costValue_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"idLand_","type":"uint256"}],"name":"getIdLand","outputs":[{"name":"pesticide_","type":"string"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"idLand_","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"customer_","type":"address"},{"name":"pesticide_","type":"string"},{"name":"name_","type":"string"}],"name":"setLand","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"purchase_","type":"bytes8"},{"name":"idDron_","type":"uint256"},{"name":"idLand_","type":"uint256"},{"name":"idCostumer_","type":"address"},{"name":"value_","type":"uint256"}],"name":"setPay","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"idLand_","type":"uint256"}],"name":"getLand","outputs":[{"name":"customer_","type":"address"},{"name":"idLand","type":"uint256"},{"name":"altitudeMax_","type":"uint256"},{"name":"altitudeMin_","type":"uint256"},{"name":"pesticide_","type":"string"},{"name":"name_","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idDron_","type":"uint256"},{"indexed":false,"name":"altitudeMax_","type":"uint256"},{"indexed":false,"name":"altitudeMin_","type":"uint256"},{"indexed":false,"name":"costValue_","type":"uint256"}],"name":"eventSetDronOk","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idLand_","type":"uint256"},{"indexed":false,"name":"altitudeMax_","type":"uint256"},{"indexed":false,"name":"altitudeMin_","type":"uint256"},{"indexed":false,"name":"name_","type":"string"}],"name":"eventSetLandOk","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_idDron","type":"uint256"},{"indexed":false,"name":"_idLand","type":"uint256"},{"indexed":false,"name":"_idCostumer","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"purchase_","type":"bytes8"}],"name":"eventSetPaidOk","type":"event"}];
var abiERC721 = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"setMint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"name_","type":"string"},{"name":"symbol_","type":"string"},{"name":"baseURI_","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];
var abiERC20 = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name_","type":"string"},{"name":"symbol_","type":"string"},{"name":"totalSupply_","type":"uint256"},{"name":"decimals_","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":true,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];


var tokenIdDron='';
var tokenIdLand='';

//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

async function start() {
    console.log("in start()");
    const accounts = await web3.eth.getAccounts();
	addressProviderDAPP = accounts[0];
    addressProviderOwnerDron = accounts[1];
	addressProviderOwnerLand = accounts[2];
	addressProviderOwnerERC20 = accounts[3];
    addressProviderOperatorDron = accounts[4];
	addressCustomerOperator = accounts[5];
	addressProviderServicePaid = accounts[6];
	
    //Instancia web3 por cuentas usuario por contrato ABI
    web3ContractERC721Dron = new web3.eth.Contract(abiERC721, contractERC721Dron, {
            gasPrice: gasDapp,
            from: addressProviderOwnerDron
        });
    web3ContractERC721Land = new web3.eth.Contract(abiERC721, contractERC721Land, {
            gasPrice: gasDapp,
            from: addressProviderOwnerLand
        });
    web3ContractDapp = new web3.eth.Contract(abiDapp, contractDapp, {
            gasPrice: gasDapp,
            from: addressProviderDAPP
        });
	web3ContractERC20 = new web3.eth.Contract(abiERC20, contractERC20, {
            gasPrice: gasDapp,
            from: addressProviderOwnerERC20
        });

    document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>------<br>Version web3: " + web3.version;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>contractERC721Dron: " + contractERC721Dron;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>contractERC721Land: " + contractERC721Land;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>contractERC20: " + contractERC20;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>contractDapp: " + contractDapp;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>addressProviderDAPP: "+addressProviderDAPP;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressProviderOwnerDron: "+addressProviderOwnerDron;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressProviderOwnerLand: "+addressProviderOwnerLand;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressProviderOwnerERC20: "+addressProviderOwnerERC20;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressProviderOperatorDron: "+addressProviderOperatorDron;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressProviderServicePaid: "+addressProviderServicePaid;
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>addressCustomerOperator: "+addressCustomerOperator;
	document.getElementById('address0').innerHTML = '0x0000000000000000000000000000000000000000';
	document.getElementById('IDCustomerLand').innerHTML = addressCustomerOperator;
	document.getElementById('IDCustomerService').innerHTML = addressCustomerOperator;
    
    setConfiguration();
	
}

start();

//inicio metodos control data html
function getNumber(event) {
	//console.log('in getNumber()');
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     return false; 
}

function getValideAltitudeMaxLand(min, max) {
	console.log('in getValideAltitudeMax() - min: '+min);
	console.log('in getValideAltitudeMax() - max: '+max);
	if(parseInt(max) <= parseInt(min)){
		document.getElementById('IDsLand').innerHTML = 'Altura maxima '+max+' es menor que '+min+' para el registro Parcela';
	}else{document.getElementById('IDsLand').innerHTML = '';}
}

function getValideAltitudeMaxDron(min, max) {
	console.log('in getValideAltitudeMax() - min: '+min);
	console.log('in getValideAltitudeMax() - max: '+max);
	if(parseInt(max) <= parseInt(min)){
		document.getElementById('IDsDron').innerHTML = 'Altura maxima '+max+' es menor que '+min+' para el registro Dron';
	}else{document.getElementById('IDsDron').innerHTML = '';}
}

//fin metodos control data  html


//inicio metodos generales parcelas

function setConfiguration() {
    console.log('in setConfiguration()');
	//configuracion contractERC721Dron
	getConfigContractERC721Dron();
	
	//configuracion contractERC721Land
	getConfigContractERC721Land();
	
	//configuracion contractERC20
	getConfigContractERC20();
	//Recarga Token contractERC20 para el rol customer
	setTransferERC20(60,addressCustomerOperator);
	
	//configuracion contractDapp
	getConfigContractDapp();
}

function getConfigContractDapp(){
	getCountDron();
	getCountLand();
}

function getConfigContractERC20(){
	document.getElementById('balanceTKN20').innerHTML = 'Total Token: ';
	
	web3ContractERC20.methods.name().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Configuracion inicial contractERC20 - Nombre Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error configuracion inicial contractERC20 - Nombre Token: " + error;
        }
    });
	
	web3ContractERC20.methods.totalSupply().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Configuracion inicial contractERC20 - Total Token: " + result;
		document.getElementById('balanceTKN20').innerHTML = document.getElementById('balanceTKN20').innerHTML + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion inicial contractERC20 - Total Token: " + error;
        }
    });
	
	web3ContractERC20.methods.symbol().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Configuracion inicial contractERC20 - Simbolo Token: " + result;
		document.getElementById('balanceTKN20').innerHTML = document.getElementById('balanceTKN20').innerHTML +' '+ result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion inicial contractERC20 - Simbolo Token: " + error;
        }
    });
	
	web3ContractERC20.methods.decimals().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Configuracion inicial contractERC20 - Decimales Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion inicial contractERC20 - Decimales Token: " + error;
        }
    });	
	
	getBalanceOfBy();
}

function getBalanceOfBy(){
	document.getElementById('balanceMoveTKN20').innerHTML = '';
	//cuenta Provider principal
	getBalanceOf(addressProviderOwnerERC20, 'Saldo cuenta principal Proveedor: ');
	//cuenta Provider servicios fumigacion pagados
	getBalanceOf(addressProviderServicePaid, 'Saldo cuenta recaudo Proveedor: ');
	//cuenta Costumer servicios fumigacion pagados
	getBalanceOf(addressCustomerOperator, 'Saldo cuenta cliente: ');
}

function getBalanceOf(data_, textBalance_){
	console.log('in getBalanceOf() -data: '+data_);	
	web3ContractERC20.methods.balanceOf(data_).call(function (error, result) {
    if (!error) {
		document.getElementById('balanceMoveTKN20').innerHTML = document.getElementById('balanceMoveTKN20').innerHTML +'<br>'+textBalance_+ result;
		document.getElementById('customerBalanceOf').innerHTML =  result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion metodo balanceOf inicial contractERC20: " + error;
        }
    });
}

function getConfigContractERC721Dron(){
	web3ContractERC721Dron.methods.name().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Configuracion inicial contractERC721Dron - Nombre Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error configuracion inicial contractERC721Dron - Nombre Token: " + error;
        }
    });
	
	web3ContractERC721Dron.methods.symbol().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Configuracion inicial contractERC721Dron - Simbolo Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion inicial contractERC721Dron - Simbolo Token: " + error;
        }
    });
}

function getConfigContractERC721Land(){
	web3ContractERC721Land.methods.name().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Configuracion inicial contractERC721Land - Nombre Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error configuracion inicial contractERC721Land - Nombre Token: " + error;
        }
    });
	
	web3ContractERC721Land.methods.symbol().call(function (error, result) {
    if (!error) {
		document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Configuracion inicial contractERC721Land - Simbolo Token: " + result;
        } else {
        document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error configuracion inicial contractERC721Land - Simbolo Token: " + error;
        }
    });
}

//fin metodos generales parcelas

//inicio metodos del DAPP
function setPay(idLand){
	console.log('in SetPay() -idLand: '+idLand);
	var value_ = document.getElementById('coste').innerHTML; 
	var costeBalanceOf_ = document.getElementById('customerBalanceOf').innerHTML;
	console.log('in SetPay()-costeBalanceOf: '+costeBalanceOf_);
	console.log('in SetPay()-value: '+value_);
	if(parseInt(value_)<=parseInt(costeBalanceOf_)){
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	var idDron_ = document.getElementById('IDdron').innerHTML; 
	var idLand_ = idLand;
	var idCostumer_ = addressCustomerOperator;
	var purchase_ = web3.utils.padRight(web3.utils.randomHex(8),16);
	console.log('in SetPay()-purchase_: '+purchase_);
	web3ContractDapp.methods.setPay(purchase_, parseInt(idDron_), parseInt(idLand_), idCostumer_, parseInt(value_) ).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta hash metodo setPay - contractDapp: " + result;
			   getEventSetPaidOk(purchase_, idDron_, idLand_, idCostumer_, value_);
			   setTransferFromERC20(idCostumer_, addressProviderServicePaid, value_);
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta hash metodo setPay - contractDapp: " + error;
            }
         });
		
	}else{
		document.getElementById('answerPay').innerHTML = 'Saldo insuficiente';
	}
	setClear();
}

function setClear(){
	document.getElementById('IDPesticideLand').innerHTML ='';
	document.getElementById('IDdron').innerHTML ='';
	document.getElementById('altitudeMinDron').innerHTML ='';
	document.getElementById('altitudeMaxDron').innerHTML ='';
	document.getElementById('coste').innerHTML ='';
}

function getIdLand(IDLand){
	console.log("in getIdLand() - IDLand: "+IDLand);
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	document.getElementById('coste').innerHTML ='';
	document.getElementById('answerPay').innerHTML ='';
	
	var idLand_ = IDLand;
	
	web3ContractDapp.methods.getIdLand(idLand_).call(function (error, result) {
		if (!error) {
			if(result[0]==0)
			{document.getElementById('IDPesticideLand').innerHTML = 'ID Parcela no encontrada';}
		else{
			 document.getElementById('IDPesticideLand').innerHTML = result[0];
			 getIdDron(result[1], result[2], result[0]);
			 console.log("in getIdLand() - result: "+result[0]);//pesticide_
			 console.log("in getIdLand() - result: "+result[1]);//altitudeMax_
			 console.log("in getIdLand() - result: "+result[2]);//altitudeMin_
             document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta metodo getIdLand - contractDapp: " + result[0] + " - " +result[1] + " - "+result[2] ;
			  } 
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta metodo getIdLand - contractDapp: " + error;
            }
         });
}

function getIdDron(altitudeMax_, altitudeMin_, pesticide_){
	console.log("in getIdDron() - : "+altitudeMax_ +" - "+altitudeMin_);
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	web3ContractDapp.methods.getDronAvailable(altitudeMax_, altitudeMin_, pesticide_).call(function (error, result) {
		if (!error) {
			if(result[0]==0){
				document.getElementById('IDdron').innerHTML = 'No hay drones disponibles';
			}else{
			//document.getElementById('IDPesticideDron').innerHTML = result;
			document.getElementById('IDdron').innerHTML = result[0];
			document.getElementById('altitudeMaxDron').innerHTML = result[1];
			document.getElementById('altitudeMinDron').innerHTML = result[2];
			document.getElementById('coste').innerHTML = result[3];
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta metodo getIdDron - contractDapp - IDdron: " + result[0];	
			}
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta metodo getIdDron - contractDapp: " + error;
            }
         });
	document.getElementById('answerPay').innerHTML ='';
}

function getDron(){
	console.log("in getDron()");
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	document.getElementById('recordDron').innerHTML = 'Cuenta Gestion ------ Cod - Nombre --- Altura Maxima - Altura Minima - Valor Servicio -- Pesticida -- Estado';
	document.getElementById('availableDron').innerHTML = 'Cod - Nombre --- Altura Maxima - Altura Minima - Pesticida ---- Estado';
	
	getCountDron();
	console.log("in getDron() - countIdDron: "+countIdDron);
	
	for(var i = 1; i < countIdDron; i++){
		web3ContractDapp.methods.getDron(i).call(function (error, result) {
		if (!error) {//address company_ 0,  uint256 idDron 1, uint256 altitudeMax_ 2, uint256 altitudeMin_ 3, uint256 costValue_ 4,string memory pesticide_ 5, string memory name_ 6, bool isActive_ 7
			   document.getElementById('recordDron').innerHTML = document.getElementById('recordDron').innerHTML + "<br>..." + result[0].slice(32,43)+" ------- "+result[1]+" ---- "+result[6]+" ------------ "+result[2]+" ----------- "+result[3]+" ---------------- "+result[4]+" ------------ "+result[5]+" --- "+result[7];
			   if(result[7]==true){
				   document.getElementById('availableDron').innerHTML = document.getElementById('availableDron').innerHTML + "<br>" +result[1]+" ----- "+result[6]+" ---------- "+result[2]+" ------------- "+result[3]+" ---------- "+result[5]+" -- Disponible";
			   }
			   
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error respuesta metodo getDron - contractDapp: " + error;
            }
         });		
	}
}

function getLand(){
	console.log("in getLand()");
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	document.getElementById('availableLand').innerHTML = 'Cuenta Gestion --- Cod - Nombre --- Altura Maxima - Altura Minima - Pesticida';
	
	getCountLand();
	console.log("in getLand() - countIdLand: "+countIdLand);
	
	for(var i = 1; i < countIdLand; i++){
		web3ContractDapp.methods.getLand(i).call(function (error, result) {
		if (!error) {
			   document.getElementById('availableLand').innerHTML = document.getElementById('availableLand').innerHTML + "<br>..." + result[0].slice(32,43)+" ------ "+result[1]+" ----- "+result[5]+" --------- "+result[2]+" ----------- "+result[3]+" ----------- "+result[4];			   
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Error respuesta metodo getLand - contractDapp: " + error;
            }
         });		
	}
}

//fin metodos del DAPP

//inicio metodos del ERC20
function setTransferERC20(data, account){
//La cuenta owner envia tokens a los customers
	console.log('in setTransferERC20() - account: '+account +" - data: "+data);
	web3ContractERC20.options.gas = gasDapp;
	web3ContractERC20.options.gasPrice = '10000000000000';
	
	var recipient = account; //Cuenta customer distino recarga
	var amount = data ; //valor de la recarga TOKEN
	
	web3ContractERC20.methods.transfer(recipient, parseInt(amount)).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta hash metodo transfer - ContractERC20: " + result;
			   setApprove(recipient,amount);
			   //getbalanceOf(recipient);
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta hash metodo transfer - ContractERC20: " + error;
            }
         });
}

function setTransferFromERC20(sender, recipient, amount){
//La cuenta owner envia tokens a los customers
	console.log('in setTransferFromERC20() - sender: '+sender +' - recipient: '+recipient+' - amount: '+amount);
	web3ContractERC20.options.gas = gasDapp;
	web3ContractERC20.options.gasPrice = '10000000000000';
	web3ContractERC20 = new web3.eth.Contract(abiERC20, contractERC20, { from: sender});
	//transferFrom(address sender, address recipient, uint256 amount)
	web3ContractERC20.methods.transferFrom(sender, recipient, parseInt(amount)).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta hash metodo transferFrom - ContractERC20: " + result;
			   setApprove(recipient,amount);
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta hash metodo transferFrom - ContractERC20: " + error;
            }
         });
	web3ContractERC20 = new web3.eth.Contract(abiERC20, contractERC20, { from: addressProviderOwnerERC20});
}

function setApprove(spender, amount){
	console.log('in setApprove() - amount: '+amount+' -spender: '+spender);
	web3ContractERC20.options.gas = gasDapp;
	web3ContractERC20.options.gasPrice = '10000000000000';
	web3ContractERC20 = new web3.eth.Contract(abiERC20, contractERC20, { from: spender});//addressCustomerOperator o addressProviderOwnerERC20
	
	web3ContractERC20.methods.approve(spender, parseInt(amount)).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta hash metodo approve - ContractERC20: " + result+" - address: "+spender;
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta hash metodo approve - ContractERC20: " + error;
            }
         });
	web3ContractERC20 = new web3.eth.Contract(abiERC20, contractERC20, { from: addressProviderOwnerERC20});//addressProviderOwnerERC20
	getBalanceOfBy();
}

//Eventos
function getEventSetPaidOk(purchase_, idDron_, idLand_, idCostumer_, value_){
	console.log("in getEventSetPaidOk()");
    web3ContractDapp.getPastEvents('eventSetPaidOk', {
        filter: {
            a: idDron_,
            b: idLand_,
			c: idCostumer_,
			d: value_,
			e: purchase_
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Respuesta evento getPastEvents de setPay - contractDapp - purchase_: "+events[0].returnValues.purchase_+" - value_: "+events[0].returnValues._value;
			document.getElementById('answerPay').innerHTML = "Pago Exitoso. Orden Servicio: "+events[0].returnValues.purchase_+" - Valor Pagado: "+events[0].returnValues._value;
        } else {
            console.log(events[events.length - 1]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br>Respuesta evento getPastEvents de setPay - contractDapp - purchase_: "+events[events.length - 1].returnValues.purchase_+" - value_: "+events[events.length - 1].returnValues._value;
			document.getElementById('answerPay').innerHTML = "Pago Exitoso. Orden Servicio: "+events[events.length - 1].returnValues.purchase_+" - Valor Pagado: "+events[events.length - 1].returnValues._value;
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
	 getDron();
}

//fin metodos del ERC20

//inicio metodos del ERC721Dron

async function setRecordDron(nameDron, altitudeMinDron, altitudeMaxDron, pesticideDron){
//function setRecordDron(nameDron, altitudeMinDron, altitudeMaxDron, pesticideDron){
	console.log('setRecordDron()');
	setCountDron();
	getCountDron();
	console.log('setRecordDron - countIdDron:'+countIdDron)
	await setMintDron(countIdDron);
	setDron(nameDron, altitudeMinDron, altitudeMaxDron, pesticideDron);	
}

function getCountDron(){
	console.log('getCountDron()');
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	var	data = web3ContractDapp.methods.getCountDron().call(function (error, result) {
		if (!error) {
              document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta metodo getCountDron - contractDapp: " + result;
			  countIdDron =  result;//document.getElementById('IDsdron').innerHTML = result;
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta getCountDron - contractDapp: " + error;
            }
         });
	console.log('getCountDron()-countIdDron: '+countIdDron);
}

function setCountDron(){
	console.log('setCountDron()');
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	web3ContractDapp.methods.setCountDron().send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setCountDron - contractDapp: " + result;
			  //getCountDron();
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error hash respuesta setCountDron - contractDapp: " + error;
            }
         });
}

function setDron(nameDron, altitudeMinDron, altitudeMaxDron, pesticideDron){
	console.log('setDron() - countIdDron: '+countIdDron);
	var date = new Date();
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	var company_ = addressProviderOperatorDron;
	var idDron_ = countIdDron;
	var altitudeMax_ = altitudeMaxDron;
	var altitudeMin_ = altitudeMinDron;
	var costValue_ = date.getSeconds() + 1;//Asignacion aleatorio del costo
	var pesticide_ = pesticideDron;
	var name_ = nameDron;
	console.log('setDron() - costValue_: '+costValue_);
	web3ContractDapp.methods.setDron(company_, parseInt(idDron_), parseInt(altitudeMax_), parseInt(altitudeMin_), parseInt(costValue_), pesticide_, name_).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setDron - contractDapp: " + result;
			  getEventSetDronOk(idDron_, altitudeMax_, altitudeMin_, costValue_)
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta setDron - contractDapp: " + error;
            }
         });
}

function setMintDron(data){
	console.log('in setMintDron() -data: '+data);
	web3ContractERC721Dron.options.gas = gasDapp;
	web3ContractERC721Dron.options.gasPrice = '10000000000000';
	
	var to_ = addressProviderOwnerDron;
	var tokenId_ = data ;
	
	web3ContractERC721Dron.methods.setMint(to_, parseInt(tokenId_)).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setMint - ContractERC721Dron: " + result +" - tokenId: "+tokenId_;
			   getEventSetMintDron(to_, tokenId_) ;
			   
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo setMint - ContractERC721Dron: " + error;
            }
         });
}

function setTransferFromDron(data){
	console.log('in setTransferFromDron()'+data);
	web3ContractERC721Dron.options.gas = gasDapp;
	web3ContractERC721Dron.options.gasPrice = '10000000000000';
	var from = addressProviderOwnerDron;
	var to = addressProviderOperatorDron ;
	var tokenId = data;
	
	web3ContractERC721Dron.methods.transferFrom(from, to, tokenId).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo transferFrom - ContractERC721Dron: " + result;
			   setApprovalForAllDron();
			   setAproveDron(tokenId);
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo transferFrom - ContractERC721Dron: " + error;
            }
         });
}

function setApprovalForAllDron(){
	console.log('in setApprovalForAllDron()');
	web3ContractERC721Dron.options.gas = gasDapp;
	web3ContractERC721Dron.options.gasPrice = '10000000000000';
	var operator =  addressProviderOperatorDron;
	var approved = true; 
	
	web3ContractERC721Dron.methods.setApprovalForAll(operator, approved).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setApprovalForAll - ContractERC721Dron: " + result;
			   getEventApprovalForAllDron(operator, approved) ;
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash setApprovalForAll transferFrom - ContractERC721Dron: " + error;
            }
         });
}

function setAproveDron(data){
	console.log('in setAproveDron() - '+data);
	web3ContractERC721Dron.options.gas = gasDapp;
	web3ContractERC721Dron.options.gasPrice = '10000000000000';
	var to = addressProviderOwnerDron;
	var tokenId = data; 
	
	web3ContractERC721Dron = new web3.eth.Contract(abiERC721, contractERC721Dron, { from: addressProviderOperatorDron});
	web3ContractERC721Dron.methods.approve(to, tokenId).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo approve - ContractERC721Dron: " + result;
			   setIsApprovedForAllDron();
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash approve transferFrom - ContractERC721Dron: " + error;
            }
         });
	web3ContractERC721Dron = new web3.eth.Contract(abiERC721, contractERC721Dron, { from: addressProviderOwnerDron});
	document.getElementById('IDsDron').innerHTML = 'Registro Exitoso'
}

function setIsApprovedForAllDron(){
	console.log('in setIsApprovedForAllDron()');
	web3ContractERC721Dron.options.gas = gasDapp;
	web3ContractERC721Dron.options.gasPrice = '10000000000000';
	var owner = addressProviderOwnerDron;//addressProviderOwner ;
	var operator = addressProviderOperatorDron;// addressProviderOperator;
	
	web3ContractERC721Dron.methods.isApprovedForAll(owner, operator).call(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo isApprovedForAll - ContractERC721Dron: " + result;
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo isApprovedForAll - ContractERC721Dron: " + error;
            }
         });
}

//Eventos

function getEventSetDronOk(idDron_, altitudeMax_, altitudeMin_, costValue_) {
    console.log("in getEventSetDronOk()");
    web3ContractDapp.getPastEvents('eventSetDronOk', {
        filter: {
            a: idDron_,
            b: altitudeMax_,
			c: altitudeMin_,
			d: costValue_
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento eventSetDronOk de setDron - contractDapp - idDron_: "+events[0].returnValues.idDron_ +" - altitudeMix_ "+events[0].returnValues.altitudeMix_+" - altitudeMax_ "+events[0].returnValues.altitudeMax_;
        } else {
            console.log(events[events.length - 1]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento eventSetDronOk de setDron - contractDapp - idDron_: "+events[events.length - 1].returnValues.idDron_ +" - altitudeMin_ "+events[events.length - 1].returnValues.altitudeMin_+" - altitudeMax_ "+events[events.length - 1].returnValues.altitudeMax_;
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
	 getDron();
}

function getEventSetMintDron(to_, tokenId_) {
    console.log("in getEventSetMintDron()");
    web3ContractERC721Dron.getPastEvents('Transfer', {
        filter: {
            a: to_,
            b: tokenId_
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
             document.getElementById('tokenIdDron').innerHTML = events[0].returnValues.tokenId 
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento Transfer de setMint - ContractERC721Dron - to: "+events[0].returnValues.to+" - tokenId: "+events[0].returnValues.tokenId;
			setTransferFromDron(events[0].returnValues.tokenId);
        } else {
            console.log(events[events.length - 1]);
            document.getElementById('tokenIdDron').innerHTML = events[events.length - 1].returnValues.tokenId;
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento Transfer de setMint - ContractERC721Dron - to: "+events[events.length - 1].returnValues.to+" - tokenId: "+events[events.length - 1].returnValues.tokenId;
			setTransferFromDron(events[events.length - 1].returnValues.tokenId);
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
}

function getEventApprovalForAllDron(operator, approved){
    console.log("in getEventApprovalForAllDron()");
    web3ContractERC721Dron.getPastEvents('ApprovalForAll', {
        filter: {
            a: operator,
            b: approved
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento ApprovalForAll de setApprovalForAll - ContractERC721Dron - owner: "+events[0].returnValues.owner+" - approved: "+events[0].returnValues.approved;
        } else {
            console.log(events[events.length - 1]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento ApprovalForAll de setApprovalForAll - ContractERC721Dron - owner: "+events[events.length - 1].returnValues.owner+" - approved: "+events[events.length - 1].returnValues.approved;
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
}

function getEventSetAproveDron(to, tokenId){
    console.log("in getEventSetAproveDron()");
    web3ContractERC721Dron.getPastEvents('_approve', {
        filter: {
            a: to,
			b: tokenId
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        var _r = '';
        if (events.length == 0) {
            console.log(events[0]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta evento _approve de approve - ContractERC721Dron - to: "+events[0].returnValues.to+" - tokenId: "+events[0].returnValues.tokenId;
			tokenIdDron='';
        } else {
            console.log(events[events.length - 1]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta evento _approve de approve - ContractERC721Dron - to: "+events[events.length - 1].returnValues.to+" - tokenId: "+events[events.length - 1].returnValues.tokenId;
			tokenIdDron='';
        };
    })
    .then(function (events) {
        console.log(events)
     });
}

//fin metodos del ERC721Dron

//inicio metodos del ERC721Land

async function setRecordLand(nameLand, altitudeMinLand, altitudeMaxLand, pesticideLand){
//function setRecordLand(nameLand, altitudeMinLand, altitudeMaxLand, pesticideLand){
	console.log('setRecordLand()');
	setCountLand();
	getCountLand();
	console.log('setRecordLand - countIdLand:'+countIdLand)
	await setMintLand(countIdLand);
	setLand(nameLand, altitudeMinLand, altitudeMaxLand, pesticideLand);	
}

function getCountLand(){
	console.log('getCountLand()');
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	var	data = web3ContractDapp.methods.getCountLand().call(function (error, result) {
		if (!error) {
              document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta metodo getCountLand - contractDapp: " + result;
			  countIdLand =  result;//document.getElementById('IDsdron').innerHTML = result;
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Error respuesta getCountLand - contractDapp: " + error;
            }
         });
	console.log('getCountLand()-countIdLand: '+countIdLand);
}

function setCountLand(){
	console.log('setCountLand()');
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	web3ContractDapp.methods.setCountLand().send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setCountLand - contractDapp: " + result;
			  //getCountLand();
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error hash respuesta setCountLand - contractDapp: " + error;
            }
         });
}

function setLand(nameLand, altitudeMinLand, altitudeMaxLand, pesticideLand){
	console.log('setLand() - countIdLand: '+countIdLand);
	web3ContractDapp.options.gas = gasDapp;
	web3ContractDapp.options.gasPrice = '10000000000000';
	
	var idLand_ = countIdLand;
	var altitudeMaxLand_ = altitudeMaxLand;
	var altitudeMinLand_ = altitudeMinLand;
	var customer_ = addressCustomerOperator;
	var pesticide_ = pesticideLand;
	var name_ = nameLand;
	
	web3ContractDapp.methods.setLand(parseInt(idLand_), parseInt(altitudeMaxLand_), parseInt(altitudeMinLand_), customer_, pesticide_, name_).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setLand - contractDapp: " + result;
			  getEventSetLandOk(idLand_, altitudeMaxLand_, altitudeMinLand_, name_)
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta setLand - contractDapp: " + error;
            }
         });
}

function setMintLand(data){
	console.log('in setMintLand() -data: '+data);
	web3ContractERC721Land.options.gas = gasDapp;
	web3ContractERC721Land.options.gasPrice = '10000000000000';
	
	var to_ = addressProviderOwnerLand;//addressCustomerOperator;
	var tokenId_ = data ;
	
	web3ContractERC721Land.methods.setMint(to_, parseInt(tokenId_)).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setMint - ContractERC721Land: " + result +" - tokenId: "+tokenId_;
			   getEventSetMintLand(to_, tokenId_) ;
			   
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo setMint - ContractERC721Land: " + error;
            }
         });
}

function setTransferFromLand(data){
	console.log('in setTransferFromLand()'+data);
	web3ContractERC721Land.options.gas = gasDapp;
	web3ContractERC721Land.options.gasPrice = '10000000000000';
	var from = addressProviderOwnerLand;
	var to = addressCustomerOperator ;
	var tokenId = data;
	
	web3ContractERC721Land.methods.transferFrom(from, to, tokenId).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo transferFrom - ContractERC721Land: " + result;
			   setApprovalForAllLand();
			   setAproveLand(tokenId);
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo transferFrom - ContractERC721Land: " + error;
            }
         });
}

function setApprovalForAllLand(){
	console.log('in setApprovalForAllLand()');
	web3ContractERC721Land.options.gas = gasDapp;
	web3ContractERC721Land.options.gasPrice = '10000000000000';
	var operator =  addressCustomerOperator;// addressProviderOperator;//'0x0000000000000000000000000000000000000000';
	var approved = true; 
	
	web3ContractERC721Land.methods.setApprovalForAll(operator, approved).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo setApprovalForAll - ContractERC721Land: " + result;
			   getEventApprovalForAllLand(operator, approved) ;
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash setApprovalForAll transferFrom - ContractERC721Land: " + error;
            }
         });
}

function setAproveLand(data){
	console.log('in setAproveLand() - '+data);
	web3ContractERC721Land.options.gas = gasDapp;
	web3ContractERC721Land.options.gasPrice = '10000000000000';
	var to = addressProviderOwnerLand;// addressProviderOwner ;
	var tokenId = data;//document.getElementById('tokenIdLand').innerHTML; 
	
	web3ContractERC721Land = new web3.eth.Contract(abiERC721, contractERC721Land, { from: addressCustomerOperator});
	web3ContractERC721Land.methods.approve(to, tokenId).send(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo approve - ContractERC721Land: " + result;
			   setIsApprovedForAllLand();
            } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash approve transferFrom - ContractERC721Land: " + error;
            }
         });
	web3ContractERC721Land = new web3.eth.Contract(abiERC721, contractERC721Land, { from: addressProviderOwnerLand});
	document.getElementById('IDsLand').innerHTML = 'Registro Exitoso'
}

function setIsApprovedForAllLand(){
	console.log('in setIsApprovedForAllLand()');
	web3ContractERC721Land.options.gas = gasDapp;
	web3ContractERC721Land.options.gasPrice = '10000000000000';
	var owner = addressProviderOwnerLand;//addressProviderOwner ;
	var operator = addressCustomerOperator;// addressProviderOperator;
	
	web3ContractERC721Land.methods.isApprovedForAll(owner, operator).call(function (error, result) {
		if (!error) {
               document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta hash metodo isApprovedForAll - ContractERC721Land: " + result;
		 } else {
                document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Error respuesta hash metodo isApprovedForAll - ContractERC721Land: " + error;
            }
         });
}

//Eventos

function getEventSetLandOk(idLand_, altitudeMaxLand_, altitudeMinLand_, name_) {
    console.log("in getEventSetLandOk() - altitudeMaxLand_: "+altitudeMaxLand_ + " -altitudeMinLand_ "+altitudeMinLand_);
    web3ContractDapp.getPastEvents('eventSetLandOk', {
        filter: {
            a: idLand_,
            b: altitudeMaxLand_,
			c: altitudeMinLand_,
			e: name_
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento eventSetLandOk de setLand - contractDapp - idLand_ "+events[0].returnValues.idLand_ + " - altitudeMin_ "+events[0].returnValues.altitudeMin_ +" - altitudeMax_"+events[0].returnValues.altitudeMax_ + " - name_"+events[0].returnValues.name_;
        } else {
            console.log(events[events.length - 1]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento eventSetLandOk de setLand - contractDapp - idLand_ "+events[events.length - 1].returnValues.idLand_+ " - altitudeMin_ "+events[events.length - 1].returnValues.altitudeMin_+" - altitudeMax_ "+events[events.length - 1].returnValues.altitudeMax_+ " - name_"+events[events.length - 1].returnValues.name_;
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
	 getLand();
}

function getEventSetMintLand(to_, tokenId_) {
    console.log("in getEventSetMintLand()");
    web3ContractERC721Land.getPastEvents('Transfer', {
        filter: {
            a: to_,
            b: tokenId_
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
             document.getElementById('tokenIdLand').innerHTML = events[0].returnValues.tokenId 
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento Transfer de setMint - ContractERC721Land - to: "+events[0].returnValues.to+" - tokenId: "+events[0].returnValues.tokenId;
			setTransferFromLand(events[0].returnValues.tokenId);
        } else {
            console.log(events[events.length - 1]);
            document.getElementById('tokenIdLand').innerHTML = events[events.length - 1].returnValues.tokenId;
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento Transfer de setMint - ContractERC721Land - to: "+events[events.length - 1].returnValues.to+" - tokenId: "+events[events.length - 1].returnValues.tokenId;
			setTransferFromLand(events[events.length - 1].returnValues.tokenId);
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
}

function getEventApprovalForAllLand(operator, approved){
    console.log("in getEventApprovalForAllLand()");
    web3ContractERC721Land.getPastEvents('ApprovalForAll', {
        filter: {
            a: operator,
            b: approved
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        if (events.length == 0) {
            console.log(events[0]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento ApprovalForAll de setApprovalForAll - ContractERC721Land - owner: "+events[0].returnValues.owner+" - approved: "+events[0].returnValues.approved;
        } else {
            console.log(events[events.length - 1]);
            document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>Respuesta evento ApprovalForAll de setApprovalForAll - ContractERC721Land - owner: "+events[events.length - 1].returnValues.owner+" - approved: "+events[events.length - 1].returnValues.approved;
        };
    })
    .then(function (events) {
        console.log('Eventos: '+events.length)
     });
}

function getEventSetAproveLand(to, tokenId){
    console.log("in getEventSetAproveLand()");
    web3ContractERC721Land.getPastEvents('_approve', {
        filter: {
            a: to,
			b: tokenId
        },
        fromBlock: 0,
        toBlock: 'latest'
    }, function (error, events) {
        var _r = '';
        if (events.length == 0) {
            console.log(events[0]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta evento _approve de approve - ContractERC721Land - to: "+events[0].returnValues.to+" - tokenId: "+events[0].returnValues.tokenId;
			tokenIdLand='';
        } else {
            console.log(events[events.length - 1]);
			document.getElementById('console').innerHTML = document.getElementById('console').innerHTML + "<br><br>------<br>Respuesta evento _approve de approve - ContractERC721Land - to: "+events[events.length - 1].returnValues.to+" - tokenId: "+events[events.length - 1].returnValues.tokenId;
			tokenIdLand='';
        };
    })
    .then(function (events) {
        console.log(events)
     });
}

//fin metodos del ERC721Land