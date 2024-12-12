import { ethers, BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from '@web3modal/ethers/vue'

const currentToken = "0x4Fd4392c0d7304E4316Bb8a49485F6B5EF0ccaC8";
const erc20 = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"owner","type":"address"},{"indexed":!0,"internalType":"address","name":"spender","type":"address"},{"indexed":!1,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"from","type":"address"},{"indexed":!0,"internalType":"address","name":"to","type":"address"},{"indexed":!1,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];


const { walletProvider } = useWeb3ModalProvider()

export const ERC20Contract = {
    approve: async (spender, amount) => {
        try {
            console.log('walletProvider', walletProvider)
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
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
    getName: async () => {
        try {
            console.log('walletProvider', walletProvider)
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
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getTotalSupply: async () => {
        try {
            console.log('walletProvider', walletProvider)
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
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getOwner: async () => {
        try {
            console.log('walletProvider', walletProvider)
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
    }
    
    
}

