<template>
  <div
    class="min-h-screen min-w-screen bg-surface-container-lowest text-on-background transition-colors duration-300">

    <button @click="showThemeControls = !showThemeControls"
            class="fixed top-2 right-2">
      <i class="material-symbols-outlined normal_outlined_icon">palette</i>
    </button>

    <div v-show="showThemeControls" class="fixed z-[9999] top-12 right-2">
      <ColorPicker/>
    </div>

    <div class="flex flex-row">
      <NavigationRail :items="navigation_rail_items"
                      :active="activeNav"
                      @navigate="changeNav"/>

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
import Snackbar from "@/components/material/communication/Snackbar.vue";
import NavigationRail, {
  addDivider,
  createItem
} from "@/components/material/navigation/NavigationRail.vue";
import {
  createGroup,
  type NavStructure
} from "@/components/material/navigation/NavigationRail.vue";

const showThemeControls = ref(false);

const navigation_rail_items: NavStructure = [
  createGroup(
    {
      label: 'Mail',
      id: 'mail_group',
      items: [
        createItem({name: 'Inbox', icon: 'inbox', id: 'item_inbox', counter: 12}),
        createItem({name: 'Sent', icon: 'inbox', id: 'item_sent'}),
        createItem({name: 'Favorite', icon: 'inbox', id: 'item_favorite'}),
        createItem({name: 'Trash', icon: 'inbox', id: 'item_trash'}),
      ]
    }
  ),
  createItem({
    name: 'Components',
    icon: 'inbox',
    id: 'item_components',
    children: [
      createItem({name: 'Chips', icon: 'inbox', id: 'item_chips'}),
      createItem({name: 'Buttons', icon: 'inbox', id: 'item_buttons'}),
      createItem({name: 'TextFields', icon: 'inbox', id: 'item_text_fields'}),
      createItem({name: 'Selects', icon: 'inbox', id: 'item_selects'}),
      createItem({name: 'Checkboxes', icon: 'inbox', id: 'item_checkboxes'}),
      createItem({name: 'RadioButtons', icon: 'inbox', id: 'item_radio_buttons'}),
      createItem({name: 'Switches', icon: 'inbox', id: 'item_switches'}),
    ]
  }),
  addDivider(),
  createGroup({
    label: 'Labels',
    id: 'labels_group',
    foldable: true,
    items: [
      createItem({name: 'Work', icon: 'inbox', id: 'item_work'}),
      createItem({name: 'Family', icon: 'inbox', id: 'item_family'}),
      createItem({name: 'Friends', icon: 'inbox', id: 'item_friends'}),
      createItem({name: 'Clients', icon: 'inbox', id: 'item_clients'}),
    ]
  })
]

const activeNav = ref(['labels_group', 'item_friends']);

function changeNav(id: string, path: string[]) {
  activeNav.value = path;
}
</script>
