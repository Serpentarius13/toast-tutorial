<template>
  <input @input="handleInput" class="input" />
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  border-bottom: 1px solid lightblue;

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 0.5rem;
    font-size: 1.7rem;
    font-weight: 500;

    &:focus {
      outline: 1px solid blue;
    }
  }
}
</style>
