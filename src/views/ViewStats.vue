<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters of all notes</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNotes"
      class="input"
      type="text"
      placeholder="Do you love TS-Notes?"
      v-autofocus
    />
  </div>
</template>

<script setup>
import { useStoreNotes } from "@/stores/storeNotes";
import { vAutofocus } from "@/directives/vAutofocus";
import { useWatchCharacters } from "@/use/useWatchCharacters";
import { ref } from "vue";

const storeNotes = useStoreNotes();

const loveNotes = ref("");

useWatchCharacters(loveNotes, 50);
</script>
