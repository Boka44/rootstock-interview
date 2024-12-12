import { ethers, BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from '@web3modal/ethers/vue'

const currentToken = "0x4Fd4392c0d7304E4316Bb8a49485F6B5EF0ccaC8";
const erc20 = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
    // add owner function
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
    },
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const { walletProvider } = useWeb3ModalProvider()

export const ERC20Contract = {
    approve: async (spender, amount) => {
        try {
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.approve(spender, amount);
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    
    getBalance: async (address) => {
        try {
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.balanceOf(address);
    
            return ethers.formatUnits(res, 18);
            // return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    getName: async () => {
        // Get Name and Get symbol are not returning any value, this is confirmed on remix as well, there is a potential issue with the contract.
        try {
            return 'MyToken';
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.name();
            console.log("Name: ", res)
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    getSymbol: async () => {
        // See note above
        try {
            return 'MTK';
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.symbol();
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getTotalSupply: async () => {
        try {
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.totalSupply();
            return ethers.formatUnits(res, 18);

        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getOwner: async () => {
        // Owner function not listed in the abi or fucntion hashes
        try {
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.owner();
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    transfer: async (to, amount) => {
        try {
            console.log('walletProvider', walletProvider)
            if (!walletProvider.value) return 'No wallet connected';
            const ethersProvider = new BrowserProvider(walletProvider.value)
            console.log('ethersProvider', ethersProvider)
            const signer = await ethersProvider.getSigner()
            console.log('signer', signer)
            const contract = new ethers.Contract(
                currentToken,
                erc20,
                signer
            );
            console.log('contract', contract)
            const res = await contract.transfer(to, amount);
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    
    
}

