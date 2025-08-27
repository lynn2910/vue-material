<template>
  <Teleport to="body">
    <div class="fixed top-0 left-0 w-screen h-screen">
      <div class="absolute h-screen w-screen bg-black/50 z-40" @click="emit('close')"/>

      <div
        class="flex flex-row h-full fixed top-0 right-0 z-50 bg-surface text-on-surface w-1/3 rounded-l-xl">
        <Divider vertical v-show="props.showDivider"/>

        <!-- Divider -->
        <div class="w-full">
          <div class="w-full ml-1 mt-2">
            <AppBar :headline="props.headline" size="small"
                    :actions="appbar_actions"/>
          </div>
          <div class="p-9 pt-5">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Divider from "@/components/material/containment/dividers/Divider.vue";
import AppBar from "@/components/material/navigation/bars/AppBar.vue";

const props = defineProps<{
  headline: string,
  showDivider?: boolean,
  leading_icon?: string,
}>();

const emit = defineEmits(['close']);

const appbar_actions = [
  {
    icon: 'close',
    alt: 'Close',
    onClick: () => emit('close')
  }
]
</script>
