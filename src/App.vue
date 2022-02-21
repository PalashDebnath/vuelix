<template>
  <layout-header></layout-header>
  <div class="container-fluid bg-dark text-white pt-3 app-container">
    <router-view></router-view>
  </div>
</template>

<script>
  import LayoutHeader from './components/layout-header.vue';

  export default {
    components: {
      LayoutHeader,
    }
  }
</script>

<style>
  .app-container {
    min-height: 100vh;
  }

  .scroller::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .scroller::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 10px;
  }

  .scroller::-webkit-scrollbar-track {
      background-color: transparent;
  }
</style>
