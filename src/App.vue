<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import { store } from '@/store/store'

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  store: store,
  components: {
    Navbar
  }
}
</script>

<style>

</style>
