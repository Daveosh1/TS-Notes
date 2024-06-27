<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-1">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">TS-NOTES</div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      >
        <div class="navbar-start">
          <button
            v-if="storeAuth.user.id"
            @click="logout"
            class="button is-small is-info ml-3"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Notes
          </RouterLink>

          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

const storeAuth = useStoreAuth();

const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

const logout = () => {
  showMobileNav.value = false;
  storeAuth.logoutUser();
};

onClickOutside(
  navbarMenuRef,
  () => {
    showMobileNav.value = false;
  },
  {
    ignore: [navbarBurgerRef],
  }
);
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
