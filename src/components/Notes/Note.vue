<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink class="card-footer-item" :to="`/editNote/${note.id}`"
        >Edit</RouterLink
      >
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useStoreNotes } from "@/stores/storeNotes";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";

const storeNotes = useStoreNotes();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const characterLength = computed(() => {
  let description = props.note.content.length > 1 ? "characters" : "character";
  return `${props.note.content.length} ${description}`;
});

const modals = reactive({
  deleteNote: false,
});

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formattedDate = useDateFormat(date, "DD-MM-YYYY HH:mm");
  return formattedDate.value;
});
</script>
