const Web3 = require("web3").default;
const axios = require("axios");

const web3 = new Web3("https://polygon-rpc.com/");

const contractAddress = "0x1B1e0B40F2de34e82318876e8a16595b6695c82e" // REMIXのデプロイしたスマートコントラクトのアドレス

const contractABI = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "certified",
					"type": "bool"
				}
			],
			"name": "CropCertified",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "producer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "ipfsHash",
					"type": "string"
				}
			],
			"name": "CropRegistered",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_id",
					"type": "uint256"
				}
			],
			"name": "certifyCrop",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "crops",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "producer",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "ipfsHash",
					"type": "string"
				},
				{
					"internalType": "bool",
					"name": "certified",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_id",
					"type": "uint256"
				}
			],
			"name": "getCrop",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nextId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_ipfsHash",
					"type": "string"
				}
			],
			"name": "registerCrop",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

async function fetchCropData(cropId) {
    try {
        const crop = await contract.methods.getCrop(cropId).call();
        const ipfsHash = crop[2];

        console.log(`IPFS Hash: ${ipfsHash}`);

        const response = await axios.get(`${PINATA_GATEWAY}${ipfsHash}`);
        console.log("作物データ:", response.data);
    } catch (error) {
        console.error("データ取得エラー:", error);
    }
}

fetchCropData(0); // この数字はREMIXのスマートコントラクトで登録した作物の順番 0からはじまる