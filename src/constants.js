export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const PrimaryColor = "#ffc000";

export const ChainsConfig = {
	POLYGON_TESTNET: {
		chainId: 80001,
		rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
		chainName: "Polygon Testnet",
		nativeCurrency: {
			name: "tMATIC",
			symbol: "tMATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
		contract_address: "0xFC9206c15Be795cde60ae5E419b26ecad4EBaf5e",
	},
	FVM_MAINNET: {
		chainId: 314,
		chainName: "Filecoin Mainnet",
		nativeCurrency: { name: "Filecoin", symbol: "FIL", decimals: 18 },
		rpcUrls: ["https://api.node.glif.io"],
		blockExplorerUrls: ["https://fvm.starboard.ventures/explorer/"],
		contract_address: "0x8cd0f1Bc3636c546DD822e6D8c1a5b5FABe10aDE",
	},
};

export const CHAIN = ChainsConfig[process.env.REACT_APP_CHAIN];
