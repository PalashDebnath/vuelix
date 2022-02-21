import axios from 'axios';

import { useError, TV_MAZE_ERRORS } from '@/hooks/error';

const errorHandler =  useError();
const baseUrl = 'https://api.tvmaze.com';

const actions = {
  fetchShows: (context, data) => {
    if(context.state.shows.length !== 0) {
      context.dispatch('fetchActors', data.showId);
      context.dispatch('fetchSeasons', data.showId);
      return;
    }
    axios.get(`${baseUrl}/shows?page=${data.page}`)
         .then(res => {
           context.commit('addShows', mapShow(res.data));
           if(data.showId) context.dispatch('fetchShow', data.showId);
         })
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
  fetchShow: (context, showId) => {
    const show = context.getters.getShowById(showId);
    if(show) {
      context.dispatch('fetchActors', showId);
      context.dispatch('fetchSeasons', showId);
      return;
    }
    
    axios.get(`${baseUrl}/shows/${showId}`)
         .then(res => {
           context.commit('addShow', mapShow(res.data));
           context.dispatch('fetchActors', showId);
           context.dispatch('fetchSeasons', showId);
         })
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
  fetchShowsByQuery: (context, value) => {
    axios.get(`${baseUrl}/search/shows?q=${value}`)
         .then(res => context.commit('addQueryShows', mapShow(res.data)))
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
  fetchQueryShow: (context, showId) => {
    const show = context.getters.getQueryShowById(showId);
    console.log(show);
    context.commit('addShow', show);
    context.dispatch('fetchActors', showId);
    context.dispatch('fetchSeasons', showId);
  },
  fetchActors: (context, showId) => {
    const show = context.getters.getShowById(showId);
    if(show?.actors.length !== 0) return;

    axios.get(`${baseUrl}/shows/${showId}/cast`)
         .then(res => context.commit('addActors', { showId, actors: mapActor(res.data) }))
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
  fetchSeasons: (context, showId) => {
    const show = context.getters.getShowById(showId);
    if(show?.seasons.length !== 0) return;

    axios.get(`${baseUrl}/shows/${showId}/seasons`)
         .then(res => {
            context.commit('addSeasons', { showId, seasons: mapSeason(res.data) });
            context.dispatch('fetchEpisodes', { showId, seasonId: res.data[0].id });
          })
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
  fetchEpisodes: (context, data) => {
    const show = context.getters.getShowById(data.showId);
    const season = show?.seasons.find(season => season.id === data.seasonId);
    if(season?.episodes.length !== 0) return;

    axios.get(`${baseUrl}/seasons/${data.seasonId}/episodes`)
         .then(res => context.commit('addEpisodes', {...data, episodes: mapEpisode(res.data)}))
         .catch(err => errorHandler(err.response, TV_MAZE_ERRORS));
  },
};

const mapShow = (records) => {
  const shows = [];

  if(!Array.isArray(records)) {
    return {
      id: records.id,
      name: records.name,
      genres: records.genres,
      summary: records.summary,
      language: records.language,
      image: records.image?.medium,
      rating: records.rating?.average,
      actors: mapActor(records._embedded?.cast),
      seasons: mapSeason(records._embedded?.seasons)
    }
  }

  for (let record of records) {
    if(record.show)
      record = record.show;

    shows.push({
      id: record.id,
      name: record.name,
      genres: record.genres,
      summary: record.summary,
      language: record.language,
      image: record.image?.medium,
      rating: record.rating?.average,
      actors: mapActor(record._embedded?.cast),
      seasons: mapSeason(record._embedded?.seasons)
    });
  }

  return shows;
}

const mapActor = (records) => {
  if(!records) return [];

  const actors = [];
  for (const record of records) {
    actors.push({
      id: record.person.id,
      name: record.person.name,
      image: record.person.image?.medium,
      characterName: record.character.name
    });
  }

  return actors;
}

const mapSeason = (records) => {
  if(!records) return [];

  const seasons = [];
  for (const record of records) {
    seasons.push({
      id: record.id,
      number: record.number,
      episodes: mapEpisode()
    });
  }

  return seasons;
}

const mapEpisode = (records) => {
  if(!records) return [];
  
  const episodes = [];
  for (const record of records) {
    episodes.push({
      id: record.id,
      name: record.name,
      image: record.image?.medium,
      number: record.number,
      rating: record.rating.average,
      summary: record.summary,
    });
  }

  return episodes;
}

export default actions;