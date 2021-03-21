const DAPP = artifacts.require("DAPP");

contract("DAPP", accounts => {
	it("El constructor se construye con dato 1", () => 
		DAPP.deployed()
			.then(instance => instance.getCountDron.call({from: "0x0e596199ea5c6d3cbc713183e7514be022a19385"}))
			.then(getCountDron => {
				assert.equal(
					getCountDron.valueOf(),
					1,
					"El constructor no se construye con dato 1"
					);
    }));
	
	it("Se incrementa el contador de drones, y retorna un true", () => 
		DAPP.deployed()
			.then(instance => instance.getCountDron.call({from: "0x0e596199ea5c6d3cbc713183e7514be022a19385"}))
			.then(getCountDron => {
				assert.equal(
					getCountDron,
					true,
					"No se incrementa el contador de drones, y retorna un true"
					);
    }));
	
	it("Se añade un dron y retorna true", () => 
		DAPP.deployed()
			.then(instance => instance.setDron.call(accounts[0], 1, 10, 20, 23, 'Pesticida.A', 'NombreDron1'))
			.then(setDron => {
				assert.equal(
					setDron,
					true,
					"No se registra el dron"
					);
    }));
})