<script setup lang="ts">
import { toRefs, ref } from 'vue';
import { api } from '@/api';

import CurrencyField from '@/components/CurrencyField/CurrencyField.vue';

const props = defineProps({
  convertTo: {
    type: String,
    required: true,
  }
});

const { convertTo } = toRefs(props);

const mainCurrency = ref('pln');
const firstCurrencyValue = ref(0);
const secondCurrencyValue = ref(0);

let currentPrice = 0;

async function getCurrencyPrice(currencyName: string) {
  const response = await api.exchangerates.getExchangeRate(currencyName);
  currentPrice = response.rates?.[0].mid;
}

async function convertFromMain() {
  await getCurrencyPrice(convertTo.value);
  secondCurrencyValue.value = firstCurrencyValue.value / currentPrice;
}

async function convertToMain() {
  await getCurrencyPrice(convertTo.value);
  firstCurrencyValue.value = secondCurrencyValue.value * currentPrice;
}
</script>
<template>
  <div class="currency-converter">
    <CurrencyField
        class="currency-converter__main"
        @input="convertFromMain()"
        v-model:value.number="firstCurrencyValue"
        :currency-name="mainCurrency" />
    <CurrencyField
        class="currency-converter__to"
        @input="convertToMain()"
        v-model:value.number="secondCurrencyValue"
        :currency-name="convertTo" />
  </div>
</template>

<style scoped lang="scss">
.currency-converter {
  width: 100%;
  display: flex;

  &__main {
    justify-content: flex-end;
    background: var(--vt-c-indigo);
    color: var(--vt-c-white);
  }

  &__to {
    justify-content: flex-start;
  }
}
</style>
