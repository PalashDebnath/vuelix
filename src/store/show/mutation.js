
const mutations = {
  addShows: (state, payload) => {
    state.shows = payload;
  },
  addShow: (state, payload) => {
    state.shows.push(payload);
  },
  addActors: (state, payload) => {
    const index = state.shows.findIndex(show => show.id === payload.showId);
    if(index >= 0) state.shows[index].actors = payload.actors;
  },
  addSeasons: (state, payload) => {
    const index = state.shows.findIndex(show => show.id === payload.showId);
    if(index >= 0) state.shows[index].seasons = payload.seasons;
  },
  addEpisodes: (state, payload) => {
    const showIndex = state.shows.findIndex(show => show.id === payload.showId);
    if(showIndex >= 0) {
      const seasonIndex = state.shows[showIndex].seasons.findIndex(season => season.id === payload.seasonId);
      if(seasonIndex >= 0) state.shows[showIndex].seasons[seasonIndex].episodes = payload.episodes;
    }
  },
  addQueryShows: (state, payload) => {
    state.qShows = payload;
  }
};

export default mutations;