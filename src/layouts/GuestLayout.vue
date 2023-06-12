<script setup>
import FooterLayouts from '@/components/layouts/FooterLayouts.vue'
import NavbarLayouts from '@/components/layouts/NavbarLayouts.vue'
</script>

<template>
  <v-app>
    <!-- Navbar -->

    <NavbarLayouts />
    <!-- End Navbar -->
    <div class="container mt-15">
      <RouterView />
    </div>
    <!-- Footer -->

    <FooterLayouts />

    <!-- End Footer -->
  </v-app>
</template>
