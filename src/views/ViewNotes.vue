<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="AddEditNoteRef"
      placeholder="Add a new Note"
      label="Add Note"
    >
      <template #buttons>
        <button
          class="button is-link has-background-success"
          @click="addNewNote"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    />
    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
      <div
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
        v-if="!storeNotes.notes.length"
      >
        There are no notes yet...
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";

const storeNotes = useStoreNotes();

const newNote = ref("");
const AddEditNoteRef = ref(null);

const addNewNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = "";
  AddEditNoteRef.value.focusTextArea();
};

useWatchCharacters(newNote);
</script>
