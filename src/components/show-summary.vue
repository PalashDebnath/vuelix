<template>
  <div class="row my-4" v-if="show">
    <div class="col-md-4 col-sm-12 col-xs-12  d-flex justify-content-center">
      <img
        :alt="show.name"
        :src="show.image ? show.image : NoImage"
      />
    </div>
    <div class="col-md-8 col-sm-12 col-xs-12">
      <b>NAME</b>
      <p>{{show.name}}</p>
      <b>RATING</b>
      <p>{{show.rating}}</p>
      <b>LANGUAGE</b>
      <p>{{show.language}}</p>
      <b>SUMMARY</b>
      <div v-html="show.summary">
      </div>
    </div>
  </div>
</template>

<script>
  import { inject } from 'vue';

  import NoImage from '@/assets/no-image.jpg';
  
  export default {
    setup() {
      const show = inject('show');
      
      return { show, NoImage };
    }
  }
</script>