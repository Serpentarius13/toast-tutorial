<template>
  <label class="radio">
    <input
      type="radio"
      :checked="isCheckedComputed"
      :value="value"
      @input="handleInput"
    />

    <div>
      <span />
    </div>

    {{ placeholder }}
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IRadio {
  value: unknown;
  modelValue: unknown;
  placeholder: string;
}

const props = defineProps<IRadio>();

const emit = defineEmits(["update:modelValue"]);

console.log(props);

const isCheckedComputed = computed<boolean>(
  () => props.value == props.modelValue
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped lang="scss">
.radio {
  display: flex;
  align-items: center;
  gap: 1.4rem;

  cursor: pointer;

  font-size: 1.6rem;
  input {
    display: none;
  }

  div {
    width: 2rem;
    aspect-ratio: 1/1;
    border: 1px solid lightblue;

    display: grid;
    place-items: center;

    span {
      display: block;
      width: 1rem;
      aspect-ratio: 1/1;
      background-color: blue;

      opacity: 0;
      transition: 0.25s ease all;
    }
  }

  input:checked ~ div {
    border-color: blue;

    span {
      opacity: 1;
    }
  }
}
</style>
