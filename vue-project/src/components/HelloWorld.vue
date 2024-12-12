<script setup>
import { ERC20Contract } from '../contract/ERC20';
import { useWeb3ModalAccount } from '@web3modal/ethers/vue';
import { ref, watch, onMounted } from 'vue';
import { ethers } from 'ethers';

defineProps({
  msg: {
    type: String,
    required: true,
  },
});

const { isConnected, address } = useWeb3ModalAccount();
let totalSupply = ref(0);
let name = ref('');
let symbol = ref('');
let balance = ref(0);
let to = ref('');
let amount = ref(0);

async function transfer() {
  const parsedAmount = ethers.parseUnits(amount.value.toString(), 18);
  console.log('Transfer', to.value, parsedAmount);
  await ERC20Contract.transfer(to.value, parsedAmount);
  balance.value = await ERC20Contract.getBalance(address.value);
}

async function updateData() {
  if (!isConnected) {
    return;
  }
  totalSupply.value = await ERC20Contract.getTotalSupply();
  balance.value = await ERC20Contract.getBalance(address.value);
  name.value = await ERC20Contract.getName();
  symbol.value = await ERC20Contract.getSymbol();
}

onMounted(() => {
  if (isConnected) {
    updateData();
  }
});

watch(
  () => isConnected,
  (newVal) => {
    if (newVal) {
      updateData();
    }
  }
);
</script>

<template>
  <div class="container">
    <div v-if="!isConnected" class="connect-wallet">
      <h3>Connect Wallet</h3>
      
    </div>
    <div class="wallet">
        <w3m-button />
      </div>

    <div v-if="isConnected" class="token-section">
      <h3>Token Details</h3>
      <div class="token-details">
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Symbol:</strong> {{ symbol }}</p>
        <p><strong>Total Supply:</strong> {{ totalSupply }}</p>
        <p><strong>Balance:</strong> {{ balance }}</p>
      </div>

      <div class="transfer-section">
        <h3>Transfer Tokens</h3>
        <div class="transfer-form">
          <input v-model="to" placeholder="To Address" class="input" />
          <input v-model="amount" placeholder="Amount" type="number" class="input" />
          <button @click="transfer" class="button">Transfer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.connect-wallet {
  text-align: center;
}

.wallet {
  margin-top: 15px;
}

.token-section {
  margin-top: 20px;
}

.token-details {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.token-details p {
  font-size: 1rem;
  margin: 8px 0;
  color: #555;
}

.transfer-section {
  text-align: center;
}

.transfer-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.input {
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #007bff;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.button:active {
  background-color: #004494;
}
</style>