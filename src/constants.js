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
};

export const CHAIN = ChainsConfig[process.env.REACT_APP_CHAIN];
