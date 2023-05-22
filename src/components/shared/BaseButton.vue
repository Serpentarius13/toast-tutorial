<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.btn {
  padding: 1.4rem 2.6rem;
  border-radius: 1.4rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  border: 1px solid transparent;

  transition: 0.25s ease all;

  &.outline {
    background: transparent;
    border-color: blue;

    &:hover {
      background-color: blue;
      color: white;
    }
  }

  &.filled {
    background-color: blue;
    border-color: blue;
    color: white;

    &:hover {
      background: transparent;

      color: black;
    }
  }
}
</style>
