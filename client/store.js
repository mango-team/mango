import { createStore, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

// import the root reducer
import rootReducer from './reducers/index'

// data
import app from './data/app'
import authors from './data/authors'
import chapterPages from './data/chapterPages'
import chapters from './data/chapters'
import comments from './data/comments'
import likes from './data/likes'
import mangas from './data/mangas'
import providers from './data/providers'
import ratings from './data/ratings'
import recommendations from './data/recommendations'
import subscriptions from './data/subscriptions'
import users from './data/users'
import views from './data/views'

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
