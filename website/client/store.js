import { createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

// import the root reducer
import rootReducer from './reducers/index'

// data
import app from '../../data/app'
import authors from '../../data/authors.json'
import chapterPages from '../../data/chapterPages.json'
import chapters from '../../data/chapters.json'
import comments from '../../data/comments.json'
import likes from '../../data/likes.json'
import mangas from '../../data/mangas.json'
import providers from '../../data/providers.json'
import ratings from '../../data/ratings.json'
import recommendations from '../../data/recommendations.json'
import subscriptions from '../../data/subscriptions.json'
import users from '../../data/users.json'
import views from '../../data/views.json'

// create an object for the default data
const defaultState = {
  app,
  authors,
  chapterPages,
  chapters,
  comments,
  likes,
  mangas,
  providers,
  ratings,
  recommendations,
  subscriptions,
  users,
  views
}

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, defaultState, enhancers)

export const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
