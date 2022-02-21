<template>
  <div class="d-flex pb-1 my-2 scroller">
    <a class="me-2" v-for="show in shows" :key="show.id">
      <div class="card">
        <img 
          :id="show.id"
          :alt="show.name"
          class="card-img-top"
          :src="show.image ? show.image : '@/assets/no-image.png'"
        />
        <span class="badge rounded-pill bg-success m-1 position-absolute">
          <i class="bi bi-star"></i> {{ show.rating }}
        </span>
      </div>
    </a>
  </div>
</template>

<script>
  import NoImage from '@/assets/no-image.jpg';

  export default {
    props: {
      pShows: {
        type: Array,
        required: true
      },
    },
    computed:{
      shows() {
        return this.pShows;
      }
    },
    data() {
      return {
        NoImage
      }
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

  a {
    cursor: pointer;
  }
</style>