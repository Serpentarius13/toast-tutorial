<template>
  <label class="checkbox">
    <input type="checkbox" @input="handleInput" />
    <div>
      <span />
    </div>

    {{ placeholder }}
  </label>
</template>

<script setup lang="ts">
interface ICheckbox {
  placeholder: string;
}

defineProps<ICheckbox>();

const emit = defineEmits(["update:modelValue"]);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  emit("update:modelValue", target.checked);
}
</script>

<style scoped lang="scss">
$border-radius: 2.4rem;
.checkbox {
  display: flex;
  align-items: center;
  gap: 1.4rem;

  cursor: pointer;

  font-size: 1.6rem;

  input {
    display: none;
  }

  div {
    width: 5rem;
    height: 2.5rem;
    border: 2px solid lightblue;
    padding: 0.2rem;

    border-radius: $border-radius;

    display: flex;
    align-items: center;

    position: relative;

    span {
      height: 90%;
      aspect-ratio: 1/1;
      background-color: lightblue;
      display: block;

      border-radius: $border-radius;

      transition: 0.25s ease all;

      left: 2px;
      position: absolute;
    }
  }

  input:checked ~ div {
    border-color: blue;
    span {
      transform: translateX(calc(100% + 4px));
      background-color: blue;
    }
  }
}
</style>
