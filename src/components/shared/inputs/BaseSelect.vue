<template>
  <div
    class="select__wrapper"
    aria-haspopup="listbox"
    :aria-expanded="isOpened"
    aria-labelledby="select-label"
    ref="selectRef"
    v-click-away="() => (isOpened = false)"
  >
    <button
      class="select__button"
      type="button"
      aria-controls="select-list"
      @click="openSelect"
    >
      <span id="select-label">
        {{ currentOption ? currentOption : placeholder }}
      </span>
      <div class="select__button-opener">
        <svg
          width="25"
          height="15"
          viewBox="0 0 25 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="isOpened && 'rotated'"
        >
          <path
            d="M2 2L12.5 12.5L23 2"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </button>

    <Transition name="select">
      <ul
        className="select__options"
        role="listbox"
        id="select-list"
        tabindex="0"
        v-if="isOpened"
      >
        <li
          v-for="option in options"
          :key="option"
          role="option"
          :aria-selected="currentOption === option"
        >
          <button
            type="button"
            @click="
              () => {
                handleSelect(option);
                openSelect();
              }
            "
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
const letters = "abcdefghijklmnopqrstuvwxyz".split("");

interface ISelectProps {
  currentOption: string | null | undefined;
  options: string[];
  placeholder: string;
}

const props = defineProps<ISelectProps>();
const emit = defineEmits(["select"]);

const isOpened = ref<boolean>(false);

const searchRef = ref<string>("");

const selectRef = ref<HTMLDivElement | null>(null);

function openSelect() {
  isOpened.value = !isOpened.value;
}

function handleKeyDown(e: any) {
  if (!selectRef.value || !document.activeElement) return;
  if (
    !selectRef.value.contains(document.activeElement) ||
    ![...selectRef.value.children].includes(document.activeElement) ||
    !(selectRef.value == document.activeElement)
  )
    return;

  switch (e.key) {
    case e.key == "ArrowDown": {
      const foundIx = props.options.findIndex(
        (el) => el == props.currentOption
      );

      if (foundIx || foundIx == 0) {
        const nextIndex = foundIx + 1;

        if (nextIndex == props.options.length) {
          handleSelect(props.options[0]);
        } else {
          handleSelect(props.options[nextIndex]);
        }
      }
      break;
    }

    case e.key == "ArrowUp": {
      const foundIx = props.options.findIndex(
        (el) => el == props.currentOption
      );

      if (foundIx || foundIx == 0) {
        const prevIndex = foundIx - 1;

        if (prevIndex < 0) {
          handleSelect(props.options[props.options.length - 1]);
        } else {
          handleSelect(props.options[prevIndex]);
        }
      }
      break;
    }

    case e.key == "Enter": {
      isOpened.value = false;
      break;
    }
  }

  if (letters.includes(e.key)) {
    searchRef.value += e.key.toLowerCase();

    const findFirst = props.options.find((country) =>
      country.toLowerCase().includes(searchRef.value.toLowerCase())
    );

    if (findFirst) handleSelect(findFirst);
  } else searchRef.value = "";

  e.preventDefault();
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

function handleSelect(option: string) {
  emit("select", option);
}
</script>

<style scoped lang="scss">
%field {
  padding: 1.2rem 0.6rem;
  font-size: 1.7rem;
}
.select {
  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background-color: white;
    position: relative;
    user-select: none;
  }

  &__button {
    display: flex;

    span {
      @extend %field;
      width: 100%;
      text-align: start;
    }

    &-opener {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: blue;

      padding: 2rem 1.5rem;
      border-radius: 0.4rem;
      width: 5rem;

      svg {
        transition: 0.25s ease all;
      }
    }
  }

  &__options {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 0;
    transform: translateY(5.7rem);

    width: 100%;

    border: 2px solid lightblue;

    max-height: 20rem;
    overflow-y: scroll;
    z-index: 2;

    border-radius: 0.4rem;

    li {
      width: 100%;
      background-color: white;
      cursor: pointer;

      button {
        @extend %field;
        width: 100%;
        text-align: start;
      }

      &:hover {
        background-color: lightblue;
      }
    }
  }
}

.rotated {
  transform: rotate(180deg);
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
}

.select-enter-active,
.select-leave-active {
  transition: 0.25s ease all;
}
</style>
