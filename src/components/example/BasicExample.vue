<template>
  <BaseInput v-model="email" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import BaseInput from "./BaseInput.vue";

const email = ref<string>("");

watchEffect(() => {
  console.log(email.value);
});
</script>

<style scoped lang="scss"></style>
