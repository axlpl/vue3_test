<script setup lang="ts">
import CurrencyConverter from '@/components/CurrencyConverter/CurrencyConverter.vue';
import { AVAILABLE_CURRENCES } from '@/constants';
</script>

<template>
  <header>
    <h1 class="app__title">Przeliczanie walut</h1>
  </header>

  <main class="app__main">
    <CurrencyConverter v-for="(item, index) in AVAILABLE_CURRENCES" :key="index" :convert-to="item" />
  </main>
</template>

<style lang="scss">
@import "./assets/base.css";

.app__title {
  text-align: center;
  margin: 50px 0 40px 0;
}
</style>
