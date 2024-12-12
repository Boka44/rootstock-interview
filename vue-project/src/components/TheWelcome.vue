<script setup>
import ERC20Contract from '../contract/ERC20'
import { useWeb3ModalAccount } from '@web3modal/ethers/vue'
defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const { account, connect, disconnect, isConnected } = useWeb3ModalAccount()
const totalSupply = await ERC20Contract.getTotalSupply();
const owner = await ERC20Contract.getOwner();
let balance = await ERC20Contract.getBalance(account);
let to = ref('');
let amount = ref(0);
async function transer() {
  await ERC20Contract.transfer(to.value, amount.value);
  balance = await ERC20Contract.getBalance(account);
}

</script>

<template>
 <div>
        <h3>Connect Wallet</h3>
        <br>
        <div class="wallet">
          <w3m-button />
        </div>

        <div v-if="isConnected">
          <h3>Connected Account</h3>
          <p>{{ account }}</p>
          <p>Balance: {{ balance }}</p>
          <br>
          <h3>Claim Tokens (100)</h3> 
          <br>
          <button @click="claim()">Claim</button>
          <br>
          <h3>Transfer tokens</h3> 
          <br>
          <input v-model="to" placeholder="To Address" />
          <br>
          <input v-model="amount" placeholder="Amount" />
          <button @click="transer()">Transfer</button>
          <button @click="disconnect">Disconnect</button>
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
