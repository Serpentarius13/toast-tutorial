<template>
  <Toaster />

  <button @click="successToast">Click me</button>
</template>

<script setup lang="ts">
import Toaster from "./components/Toaster.vue";
import useToasterStore from "./stores/useToasterStore";

const toasterStore = useToasterStore();

const successToast = () => toasterStore.success({ text: "Yahoooooo!" });
</script>

<style scoped lang="scss"></style>
