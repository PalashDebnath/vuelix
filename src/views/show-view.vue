<template>
  <div @click="onClick">
    <div v-for="prop in props" :key="prop.name">
      <p>{{prop.name}}</p>
      <show-genre :pShows="prop.shows.value"></show-genre>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  import { Genre } from '../store/show';
  import ShowGenre from '../components/show-genre.vue';

  export default {
    components: {
      ShowGenre
    },
    setup() {
      const props = [];
      const store = useStore();
      const router = useRouter();

      store.dispatch('fetchShows', {page: 0});

      for (const genre of Object.values(Genre)) {
        props.push({
          name: genre.toUpperCase(),
          shows: computed(() => store.getters['getShowsByGenre'](genre))
        });
      }

      const onClick = (event) => {
        if(event.target.id) {
          router.push('/shows/' + event.target.id);
        }
      }

      return { props, onClick };
    }
  }
</script>