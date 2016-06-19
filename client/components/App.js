import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Layout from './Layout'

function mapStateToProps (props) {
  const {
    app,
    authors,
    chapterPages,
    chapters,
    comments,
    likes,
    mangas,
    providers,
    ratings,
    users,
    views
  } = props

  return {
    app,
    authors,
    chapterPages,
    chapters,
    comments,
    likes,
    mangas,
    providers,
    ratings,
    users,
    views
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Layout)

export default App
