<template>
  <div>
    <Fab :icon="opened ? 'close' : props.icon"
         ref="anchor"
         @click="opened = !opened"
         :color_set="props.color_set"/>

    <FabMenu :items="props.items"
             :anchor="anchor"
             :color_set="props.color_set"
             :show-menu="opened"
             @close="opened = false"/>
  </div>
</template>

<script setup lang="ts">
import FabMenu, {type FabMenuItem} from "@/components/material/buttons/fabWithMenus/FabMenu.vue";
import {ref} from "vue";
import Fab from "@/components/material/buttons/fab/Fab.vue";

const opened = ref(false);
const anchor = ref<HTMLElement | null>(null);

const props = defineProps<{
  color_set?: "primary" | "secondary" | "tertiary",
  icon: string,
  items: FabMenuItem[]
}>();
</script>
