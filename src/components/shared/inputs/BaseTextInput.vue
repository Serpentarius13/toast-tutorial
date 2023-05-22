<template>
  <BaseInputError :error="error">
    <div class="input">
      <input
        :type="inputType"
        :placeholder="placeholder"
        @input="handleInput"
      />

      <button @click="changeInputType" type="button">
        <img
          v-if="props.type === 'password'"
          :src="iconComputed.src"
          :alt="iconComputed.alt"
        />
      </button>
    </div>
  </BaseInputError>
</template>

<script setup lang="ts">
import BaseInputError from "./BaseInputError.vue";
import { ref, computed } from "vue";
type TInputType = "text" | "password";

interface ITextInput {
  type?: TInputType;
  placeholder: string;

  error?: string | undefined;
}

const props = withDefaults(defineProps<ITextInput>(), { type: "text" });

const emit = defineEmits(["update:modelValue"]);

const inputType = ref<TInputType>(props.type);

const iconComputed = computed<{ src: string; alt: string }>(() => {
  if (inputType.value === "password")
    return { src: "/icons/eye-off.svg", alt: "Closed eye" };
  else return { src: "/icons/eye.svg", alt: "Opened eye" };
});

function changeInputType() {
  if (inputType.value === "password") inputType.value = "text";
  else inputType.value = "password";
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped lang="scss">
.input {
  position: relative;
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

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    img {
      width: 2.2rem;
    }
  }
}
</style>
