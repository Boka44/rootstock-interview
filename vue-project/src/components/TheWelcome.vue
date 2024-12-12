<script setup>
import {ERC20Contract} from '../contract/ERC20'
import { useWeb3ModalAccount } from '@web3modal/ethers/vue'
import { ref, watch } from 'vue';
defineProps({
  msg: {
    type: String,
    required: true,
  },
})


const { account, connect, disconnect, isConnected } = useWeb3ModalAccount()
let totalSupply = ref(0);
let name = ref('');
let symbol = ref('');
let owner = ref('');
let balance = ref(0);
let to = ref('');
let amount = ref(0);
async function transer() {
  await ERC20Contract.transfer(to.value, amount.value);
  balance = await ERC20Contract.getBalance(account);
}

async function updateData() {
  totalSupply = await ERC20Contract.getTotalSupply();
  owner = await ERC20Contract.getOwner();
  balance = await ERC20Contract.getBalance(account);
  name = await ERC20Contract.getName();
  symbol = await ERC20Contract.getSymbol();
  
}

watch((isConnected) => {
  if (isConnected) {
    updateData();
  }
});

</script>

<template>
 <div>
        <h3>Connect Wallet</h3>
        <br>
        <div class="wallet">
          <w3m-button />
        </div>

        <div v-if="isConnected">
          
          <h3>Token Details</h3>
          <br>
          <p>Name: {{ name }}</p>
          <p>Symbol: {{ symbol }}</p>
          <p>Total Supply: {{ totalSupply }}</p>
          <p>Owner: {{ owner }}</p>

          <p>Balance: {{ balance }}</p>
          <br>
          <h3>Transfer tokens</h3> 
          <br>
          <input v-model="to" placeholder="To Address" />
          <br>
          <input v-model="amount" placeholder="Amount" />
          <button @click="transer()">Transfer</button>
        </div>
          
 </div>
      

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
