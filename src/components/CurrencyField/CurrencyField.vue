<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import NumberField from '@/components/NumberField/NumberField.vue';

const props = defineProps({
  currencyName: String,
  value: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:value', value: number): void;
}>();

const currentValue = ref(0);

const { currencyName, value } = toRefs(props);

function updateModelValue(): void {
  emit('update:value', currentValue.value);
}

watch(value, () => {
  currentValue.value = value.value;
});
</script>

<template>
  <div class="currency-field">
    <div class="currency-field__col currency-field__col--name">
      {{ currencyName }}:
    </div>
    <div class="currency-field__col">
      <NumberField @input="updateModelValue" v-model:value.number="currentValue" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.currency-field {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__col {
    padding: 5px 10px;

    &--name {
      text-transform: uppercase;
      text-align: right;
      min-width: 100px;
    }
  }
}
</style>
