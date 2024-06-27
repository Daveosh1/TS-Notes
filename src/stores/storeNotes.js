import { defineStore } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        /*
        {
          id: "id1",
          content: "lorem Ipsum",
        },
        {
          id: "id2",
          content: "lorem Ipsum part 2",
        },
        */
      ],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      //initialize DataBase refs
      this.getNotes();
    },

    async addNote(newNoteContent) {
      let currentDate = new Date().getTime();
      let id = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: id,
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content: content,
      });
    },
    async getNotes() {
      this.notesLoaded = false;

      getNotesSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });

          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot(); //unsubscribe from any active listener
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => {
          return note.id === id;
        })[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
