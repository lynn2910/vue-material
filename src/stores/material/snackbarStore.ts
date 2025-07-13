import {defineStore} from 'pinia';
import Queue from "@/stores/material/Queue.ts";
import {computed, ref, watch} from "vue";

export interface Notification {
  message: string,
  duration?: number,
  show_close_btn?: boolean,
  action?: { label: string, onClick: () => void },
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const notificationsQueue = ref(new Queue<Notification>());
  const currentNotification = computed(() => notificationsQueue.value.peek() || null);

  let durationTimer: number | null = null;

  function closeNotification() {
    notificationsQueue.value.dequeue();
  }

  function addNotification(notification: Notification) {
    notificationsQueue.value.enqueue(notification);
  }

  watch(currentNotification, (newNotification: Notification | null) => {
    if (durationTimer !== null) {
      clearTimeout(durationTimer);
      durationTimer = null;
    }

    if (newNotification && newNotification.duration && newNotification.duration > 0) {
      durationTimer = setTimeout(() => {
        closeNotification();
      }, newNotification.duration);
    }
  }, {immediate: true});

  return {
    // states
    notificationsQueue,

    // computed
    currentNotification,

    // actions
    closeNotification,
    addNotification,
  }
})
