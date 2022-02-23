<script setup lang="ts">
import {ref, watch, toRefs} from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:value', value: number): void;
}>();

const { value } = toRefs(props);

const currentValue = ref(0);

function updateModelValue(): void {
  emit('update:value', currentValue.value);
}

watch(value, () => {
  currentValue.value = value.value;
});
</script>

<template>
  <input
    @input="updateModelValue"
    class="number-field"
    type="number"
    min="0"
    v-model="currentValue" />
</template>

<style scoped lang="scss">
.number-field {
  height: 40px;
  width: 100%;
}
</style>
