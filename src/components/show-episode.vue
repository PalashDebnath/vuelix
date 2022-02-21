<template>
  <div class="row pt-3 px-3" v-for="episode in episodes" :key="episode.id">
    <div class="col-md-4 d-flex justify-content-center col-xs-3">
      <img
        :alt="episode.name"
        :src="episode.image ? episode.image : NoImage"
      />
    </div>
    <div class="col-md-8 col-xs-9 summary">
      <b>SUMMARY</b>
      <div v-html="episode.summary"></div>
    </div>
  </div>
</template>

<script>
  import NoImage from '@/assets/no-image.jpg';

  export default {
    props: {
      episodes: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        NoImage
      }
    }
  }
</script>

<style scoped>
  .summary {
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>