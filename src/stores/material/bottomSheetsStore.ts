import {defineStore} from "pinia";
import {ref} from "vue";

export interface SheetDetails {
  id: string,
  onClose: () => void
}

export type SheetsList = Array<SheetDetails>;

export const useBottomSheetsStore = defineStore('bottomSheetsStore', () => {

  const sheets = ref<SheetsList>([]);
  const latestOpened = ref<string | null>(null);

  function registerSheet(details: SheetDetails) {
    sheets.value.push(details);
    latestOpened.value = details.id;
  }

  function closeLatestSheet() {
    if (latestOpened.value) {
      closeSheet(latestOpened.value);
    }
  }

  function closeSheet(id: string) {
    if (id === latestOpened.value) {
      let index = sheets.value.findIndex(sheet => sheet.id === id);
      if (index !== -1) {
        latestOpened.value = sheets.value[index + 1]?.id || null;
      } else {
        latestOpened.value = null;
      }
    }

    let details = sheets.value.find(sheet => sheet.id === id);
    if (details) {
      details.onClose();
      sheets.value = sheets.value.filter(sheet => sheet.id !== id);
    }
  }

  return {
    sheets,
    registerSheet,
    closeSheet,
    closeLatestSheet
  }
})
