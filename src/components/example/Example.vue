<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" />
    <input required />
    <textarea />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseExample from "./BaseInput.vue.js";

const email = ref<string>("");

function handleSubmit() {
  console.log("Form was submitted");
}
</script>

<style scoped lang="scss"></style>
