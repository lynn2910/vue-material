<template>
  <div
    class="min-h-screen min-w-screen bg-background text-on-background transition-colors duration-300">

    <button @click="showThemeControls = !showThemeControls"
            class="fixed top-2 right-2">
      <i class="material-icons-outlined">palette</i>
    </button>

    <div v-show="showThemeControls" class="fixed top-12 right-2">
      <ColorPicker/>
    </div>

    <NavigationRail :items="navigation_rail_items"
                    :expanded-layout="ExpandedLayout.Standard"></NavigationRail>

    <router-view/>

  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from "vue";
import ColorPicker from "@/components/material/ColorPicker.vue";
import NavigationRail, {ExpandedLayout} from "@/components/material/navigation/NavigationRail.vue";

const showThemeControls = ref(false);

const navigation_rail_items = [
  {
    selected: true,
    icon: "home",
    label: "Introduction"
  },
  {
    type: 'section',
    label: "Composants"
  },
  {
    selected: false,
    icon: "apps",
    label: "Navigation"
  }
]
</script>
