<template>
  <div class="row" v-if="show">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="season in show.seasons" :key="season.id">
          <button
            role="tab"
            type="button"
            :id="season.id"
            data-bs-toggle="tab"
            aria-selected="true"
            @click="onClick(season.id)"
            :aria-controls="'season' + season.number"
            :data-bs-target="'#season' + season.number"
            :class="['nav-link text-white', {'active': season.id === current}]"
          >
            {{"SEASON " + season.number}}
          </button>
        </li>
      </ul>
      <div class="tab-content">
        <div
          role="tabpanel"
          :key="season.id"
          v-for="season in show.seasons"
          :id="'season' + season.number"
          :aria-labelledby="'season' + season.number"
          :class="['tab-pane fade show', {'active': season.id === current}]"
        >
          <show-episode :episodes="season.episodes"></show-episode>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { computed, inject, ref } from 'vue';

  import ShowEpisode from './show-episode.vue';

  export default {
    components: {
      ShowEpisode
    },
    setup() {
      const index = ref(0);
      const store = useStore();
      const show = inject('show');

      const current = computed(() => show.value.seasons[index.value].id);

      const onClick = (seasonId) => {
        store.dispatch('fetchEpisodes', { showId: show.value.id, seasonId });
        const id = show.value.seasons.findIndex(season => season.id === seasonId);
        if(id > 0) index.value = id;
      }
      
      return { show, current, onClick };
    }
  }
</script>

<style scoped>
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    background-color: #198754;
  }
</style>

