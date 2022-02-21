const getters = {
  getShowsByGenre: (state) => (type) => {
    return state.shows
                .filter(show => show.genres?.findIndex(genre => genre == type) != -1)
                .sort((a, b) => b.rating - a.rating);
  },
  getShowById: (state) => (id) => {
    const index = state.shows.findIndex(show => show.id == id);
    return state.shows[index];
  },
  getShowsByQuery: (state) => {
    return state.qShows.sort((a, b) => b.rating - a.rating);
  },
  getQueryShowById: (state) => (id) => {
    const index = state.qShows.findIndex(show => show.id == id);
    return state.qShows[index];
  }
};

export default getters;