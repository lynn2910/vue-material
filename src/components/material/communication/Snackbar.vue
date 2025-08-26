<template>
  <Teleport to="body">
    <Transition
      :name="animationName"
      @after-leave="onAfterLeave"
    >
      <button
        v-if="currentNotification && !isClosing"
        :class="snackbarClasses"
        :key="currentNotification.id"
        @click="snackbarStore.closeNotification()"
      >
        <p class="flex flex-grow text-sm tracking-[0.25px]">{{ currentNotification?.message }}</p>

        <button
          class="flex items-center cursor-pointer"
          @click="snackbarStore.closeNotification()"
          v-if="currentNotification?.show_close_btn || (currentNotification?.duration && currentNotification?.duration > 0)"
        >
          <ButtonIcon inverse-colors icon="close"/>
        </button>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  useSnackbarStore
} from "@/stores/material/snackbarStore.ts";
import {storeToRefs} from "pinia";
import {computed, nextTick} from "vue";
import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";

const snackbarStore = useSnackbarStore();
const {currentNotification, isClosing} = storeToRefs(snackbarStore);

const snackbarClasses = computed(() => {
  if (!currentNotification.value) return '';

  const position = currentNotification.value.position || 'bottom-center';
  const layout = currentNotification.value.layout || 'floating';

  let baseClasses = 'fixed z-50 shadow-md rounded bg-inverse-surface text-surface flex flex-row items-center select-none gap-x-5';

  if (layout === 'banner') {
    baseClasses += ' left-0 right-0 py-3 px-6';

    switch (position) {
      case 'top-left':
      case 'top-center':
      case 'top-right':
        baseClasses += ' top-0 rounded-t-none';
        break;
      case 'bottom-left':
      case 'bottom-center':
      case 'bottom-right':
        baseClasses += ' bottom-0 rounded-b-none';
        break;
    }
  } else {
    baseClasses += ' py-2 px-4 pr-2 max-w-sm';

    switch (position) {
      case 'top-left':
        baseClasses += ' top-4 left-4';
        break;
      case 'top-center':
        baseClasses += ' top-4 left-1/2 transform -translate-x-1/2';
        break;
      case 'top-right':
        baseClasses += ' top-4 right-4';
        break;
      case 'center-left':
        baseClasses += ' top-1/2 left-4 transform -translate-y-1/2';
        break;
      case 'center-right':
        baseClasses += ' top-1/2 right-4 transform -translate-y-1/2';
        break;
      case 'bottom-left':
        baseClasses += ' bottom-4 left-4';
        break;
      case 'bottom-center':
        baseClasses += ' bottom-4 left-1/2 transform -translate-x-1/2';
        break;
      case 'bottom-right':
        baseClasses += ' bottom-4 right-4';
        break;
      default:
        baseClasses += ' bottom-4 left-1/2 transform -translate-x-1/2';
    }
  }

  return baseClasses;
});

const animationName = computed(() => {
  if (!currentNotification.value) return 'slide-up';

  const position = currentNotification.value.position || 'bottom-center';
  const layout = currentNotification.value.layout || 'floating';

  if (layout === 'banner') {
    if (position.startsWith('top')) return 'slide-down';
    return 'slide-up';
  }

  switch (position) {
    case 'top-left':
    case 'top-center':
    case 'top-right':
      return 'slide-down';
    case 'center-left':
      return 'slide-right';
    case 'center-right':
      return 'slide-left';
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right':
    default:
      return 'slide-up';
  }
});

function onAfterLeave() {
  nextTick(() => {
  });
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Animation slide-right (left side) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-up-enter-from.transform,
.slide-up-leave-to.transform {
  transform: translateY(100%) translateX(-50%);
}

.slide-down-enter-from.transform,
.slide-down-leave-to.transform {
  transform: translateY(-100%) translateX(-50%);
}
</style>
