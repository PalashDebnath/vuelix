import actions from './action';
import getters from './getter';
import mutations from './mutation';

const show = {
  state: {
    shows: [],
    qShows: []
  },
  getters,
  actions,
  mutations
};

export default show;

export const Genre = {
  Drama : 'Drama',
  ScienceFiction : 'Science-Fiction',
  Thriller : 'Thriller',
  Action : 'Action',
  Crime : 'Crime',
  Horror : 'Horror',
  Romance : 'Romance',
  Adventure : 'Adventure',
  Mystery : 'Mystery',
  Supernatural : 'Supernatural',
  Comedy :'Comedy',
  Fantasy : 'Fantasy',
  Family : 'Family',
  Medical : 'Medical',
  Legal : 'Legal',
  Anime : 'Anime',
  Music : 'Music',
  History : 'History',
  War : 'War',
  Western : 'Western',
  Sports : 'Sports',
  Espionage : 'Espionage',
}