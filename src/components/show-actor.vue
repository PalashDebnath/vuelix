<template>
  <div class="d-flex my-4 pb-1 scroller" v-if="show">
    <div class="me-2" v-for="actor in show.actors" :key="actor.id">
      <div class="card">
        <img
          :alt="actor.name"
          :src="actor.image ? actor.image : NoImage"
        />
        <span class="badge bottom-0 bg-success position-absolute w-100">
          {{ actor.name }}
          <p class="p-0 m-0 text-wrap">as {{ actor.characterName }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { inject } from 'vue';

  import NoImage from '@/assets/no-image.jpg';
  
  export default {
    setup: () => {
      const show = inject('show');
      return { show, NoImage };
    }
  }
</script>

<style scoped>
  .d-flex {
    overflow-x: auto;
  }

  .card {
    width: 10rem;
  }
</style>