<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand d-none d-sm-block">
        <img src="@/assets/logo.png" alt="" width="30" height="30" /> {{ appName }}
      </div>
      <div class="navbar-brand d-block d-sm-none">
        <img src="@/assets/logo.png" alt="" width="30" height="30" />
      </div>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/shows" class="nav-link">
            <i class="bi bi-grid"></i> SHOWS
          </router-link>
        </li>
      </ul>
      <ul :class="['navbar-nav',{'margin-end': showSidebar}]">
        <li class="nav-item">
          <button class="btn btn-success" @click="onClick">
            <i class="bi bi-search" v-if="!showSidebar"></i>
            <i class="bi bi-x-lg" v-else></i>
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <transition>
    <div class="sidebar bg-light overflow-auto scroller" v-if="showSidebar">
      <div class="form-floating mx-3 my-2">
        <input
          type="text"
          id="search"
          v-model="qValue"
          autocomplete="new-password" 
          placeholder="palash debnath"
          class="form-control border-success"
        />
        <label for="search">Search your show</label>
      </div>
      <div class="my-2 mx-3" @click="onShowClick">
        <a v-for="show in shows" :key="show.id">
          <div class="card mx-auto my-2">
            <img 
              :id="show.id"
              :alt="show.name"
              class="card-img-top"
              :src="show.image ? show.image : NoImage"
            />
            <span class="badge rounded-pill bg-success m-1 position-absolute">
              <i class="bi bi-star"></i> {{ show.rating }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { computed, ref, watch } from 'vue';

  import NoImage from '@/assets/no-image.jpg';

  export default {
    setup() {
      let timer;
      const qValue = ref('');
      const store = useStore();
      const router = useRouter();
      const showSidebar = ref(false);
      const appName = computed(() => store.getters.fetchAppName);
      const onClick = () => showSidebar.value = !showSidebar.value;

      watch([qValue], () => {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
          store.dispatch('fetchShowsByQuery', qValue.value);
        }, 1000);
      });

      const shows = computed(() => store.getters.getShowsByQuery);

      const onShowClick = (event) => {
        if(event.target.id) {
          const show = store.getters['getShowById'](+event.target.id);
          if(!show) store.dispatch('fetchQueryShow', +event.target.id);
          router.push('/shows/' + event.target.id);
          showSidebar.value = !showSidebar.value;
        }
      }
      
      return { shows, qValue, appName, onClick, onShowClick, showSidebar, NoImage };
    }
  }
</script>

<style scoped>
  @media (max-width: 575.98px) { 
    .navbar {
      bottom: 0;
      z-index: 2;
      width: 100vw;
      position: fixed;
    }

    .form-floating {
      z-index: 3;
      bottom: 60px;
      position: fixed;
    }
  }

  @media (min-width: 576px)
  {
    .margin-end {
      margin-right: 15rem;
      animation: slide-in 0.3s;
      animation-timing-function: linear;
    }
  }

  .card {
    width: 10rem;
  }

  .sidebar {
    top: 0;
    right: 0;
    z-index: 1;
    width: 250px;
    height: 100vh;
    position: fixed;
  }

  .v-enter-from {
    opacity: 0;
  }

  .v-enter-active {
    animation: slide-in 0.3s;
    animation-timing-function: linear;
  }

  .v-enter-to {
    opacity: 1;
  }

  .v-leave-from {
    opacity: 1;
  }

  .v-leave-active {
    animation: slide-out 0.3s;
    animation-timing-function: linear;
  }

  .v-leave-to {
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateX(200%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(200%);
    }
  }
</style>
