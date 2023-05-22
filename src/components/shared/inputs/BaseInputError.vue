<template>
  <div class="error">
    <slot />
    <Transition name="fade">
      <span v-if="error">
        {{ error }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: string | undefined | null }>();
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    font-weight: bold;
    font-size: 1.6rem;
    color: red;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease all;
}
</style>
