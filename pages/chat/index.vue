<template>
  <Sidebar />
  <div class="user-chat w-100 overflow-hidden">
    <div class="chat-content d-lg-flex">
      <Header />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './-sidebar.vue'
import Header from '~/pages/chat/-header.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'main',
})
</script>
