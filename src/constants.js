export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ChainsConfig = {
	NEO_TESTENT: {
		chainId: 3141,
		chainName: "Neo testnet",
		nativeCurrency: { name: "Neo", symbol: "NEO", decimals: 18 },
		rpcUrls: ["https://filecoin-hyperspace.chainup.net/rpc/v1"],
		blockExplorerUrls: ["https://hyperspace.filfox.info/en"],
	},
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
	},
};
