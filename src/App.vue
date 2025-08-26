<template>
  <div
    class="min-h-screen min-w-screen bg-surface-container-lowest text-on-background transition-colors duration-300">

    <button @click="showThemeControls = !showThemeControls"
            class="fixed top-2 right-2 z-50">
      <i class="material-symbols-outlined normal_outlined_icon">palette</i>
    </button>

    <div v-show="showThemeControls" class="fixed z-[9999] top-12 right-2">
      <ColorPicker/>
    </div>

    <div class="flex flex-row w-screen h-screen">
      <div class="flex-shrink-0">
        <NavigationRail :items="navigation_rail_items"
                        :active="activeNav"
                        show_top_icon
                        v-model="expandNav"
                        allow_expand_change
                        :fab="{icon: 'edit', label: 'Edit'}"
                        :display-mode="'modal'"
                        @navigate="changeNav">

          <template #top>
            <router-link :to="{name: 'home'}">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                   class="w-10 h-10 fill-on-surface">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier"><title>material_design</title>
                  <rect width="24" height="24" fill="none"></rect>
                  <path
                    d="M21,12a9,9,0,0,0-2-5.62V17.63A8.78,8.78,0,0,0,21,12m-3.37,7H6.38a9.5,9.5,0,0,0,2.67,1.41A8.91,8.91,0,0,0,12,21,8.86,8.86,0,0,0,15,20.41,9.72,9.72,0,0,0,17.63,19M11,17,7,9v8h4m6-8-4,8h4V9m-5,5.53L15.75,7H8.25L12,14.53M17.63,5A8.91,8.91,0,0,0,6.38,5H17.63M5,17.63V6.38A9,9,0,0,0,3,12a8.78,8.78,0,0,0,2,5.63M23,12a10.57,10.57,0,0,1-3.22,7.78A10.57,10.57,0,0,1,12,23a10.59,10.59,0,0,1-7.78-3.22A10.57,10.57,0,0,1,1,12,10.59,10.59,0,0,1,4.22,4.22,10.59,10.59,0,0,1,12,1a10.57,10.57,0,0,1,7.78,3.22A10.59,10.59,0,0,1,23,12Z"></path>
                </g>
              </svg>
            </router-link>
          </template>

        </NavigationRail>
      </div>

      <div class="flex-1 overflow-y-auto">
        <router-view/>
      </div>
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
import Snackbar from "@/components/material/communication/Snackbar.vue";
import NavigationRail, {
  addDivider,
  createItem
} from "@/components/material/navigation/rails/NavigationRail.vue";
import {
  createGroup,
  type NavStructure
} from "@/components/material/navigation/rails/NavigationRail.vue";

const showThemeControls = ref(false);
const expandNav = ref(true);

const navigation_rail_items: NavStructure = [
  createItem({name: 'Inbox', icon: 'inbox', id: 'item_inbox', counter: 12}),
  createItem({name: 'Sent', icon: 'inbox', id: 'item_sent'}),
  createItem({name: 'Favorite', icon: 'inbox', id: 'item_favorite'}),
  createItem({name: 'Trash', icon: 'inbox', id: 'item_trash'}),
  addDivider(),
  createGroup({
    label: 'Labels',
    id: 'labels_group',
    foldable: true,
    showFoldedItemsByDefault: false,
    unfoldedItemsLimit: 2,
    items: [
      createItem({name: 'Work', icon: 'inbox', id: 'item_work'}),
      createItem({name: 'Family', icon: 'inbox', id: 'item_family'}),
      createItem({name: 'Friends', icon: 'inbox', id: 'item_friends'}),
      createItem({name: 'Clients', icon: 'inbox', id: 'item_clients'}),
    ]
  })
]

const activeNav = ref(['item_inbox']);

function changeNav(id: string, path: string[]) {
  activeNav.value = path;
}
</script>
