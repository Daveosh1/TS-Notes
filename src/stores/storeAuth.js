import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import { useStoreNotes } from "@/stores/storeNotes";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          storeNotes.init();
        } else {
          this.user = {};
          this.router.replace("/auth");
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {})
        .catch((error) => {});
    },
  },
});
