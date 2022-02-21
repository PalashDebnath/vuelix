<template>
  <show-summary></show-summary>
  <show-actor></show-actor>
  <show-season></show-season>
</template>

<script>
  import { useStore } from 'vuex';
  import { computed, provide } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import ShowActor from '@/components/show-actor.vue';
  import ShowSeason from '@/components/show-season.vue';
  import ShowSummary from '@/components/show-summary.vue';

  export default {
    components: {
      ShowActor,
      ShowSeason,
      ShowSummary
    },
    setup: () => {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const id = parseInt(route.params['id'].toString());
      
      if(isNaN(id)) router.push('/shows');
      store.dispatch('fetchShows', { page: 0, showId: id });

      const show = computed(() => store.getters['getShowById'](id));
      provide('show', show);
    }
  }
</script>