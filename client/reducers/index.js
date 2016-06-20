import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import app from './app'
import authors from './authors'
import chapterPages from './chapterPages'
import chapters from './chapters'
import comments from './comments'
import likes from './likes'
import mangas from './mangas'
import providers from './providers'
import ratings from './ratings'
import recommendations from './recommendations'
import subscriptions from './subscriptions'
import users from './users'
import views from './views'

const state = {
  routing,
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

const rootReducer = combineReducers(state)

export default rootReducer
