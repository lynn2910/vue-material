<template>
  <div
    class="min-h-screen min-w-screen bg-surface-container-lowest text-on-background transition-colors duration-300">

    <button @click="showThemeControls = !showThemeControls"
            class="fixed top-2 right-2">
      <i class="material-symbols-outlined normal_outlined_icon">palette</i>
    </button>

    <div v-show="showThemeControls" class="fixed top-12 right-2">
      <ColorPicker/>
    </div>

    <div class="flex flex-row">
      <NavigationRail :items="navigation_rail_items" :fab="{icon: 'add', label: 'Ajouter'}"
                      :expanded-layout="ExpandedLayout.Standard"/>

      <router-view/>

    </div>


    <!--

        Material UI required Section for global components
      DON'T EDIT THIS SECTION

      If you want to add elements, do it before this comment !!

    -->

    <Snackbar/>
  </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from "vue";
import ColorPicker from "@/components/material/ColorPicker.vue";
import NavigationRail, {
  ExpandedLayout,
  type NavigationItem
} from "@/components/material/navigation/NavigationRail.vue";
import Snackbar from "@/components/material/communication/Snackbar.vue";

const showThemeControls = ref(false);

const navigation_rail_items: NavigationItem[] = [
  {
    selected: true,
    icon: "home",
    label: "Introduction"
  },
  {
    type: 'section',
    label: "Composants",
  },
  {
    selected: false,
    icon: "apps",
    label: "Navigation",

    show_badge: true,
    badge_type: 'large',
    badge_label: 3,
  }
]
</script>
