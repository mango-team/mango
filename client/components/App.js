import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Layout from './Layout';

function mapStateToProps({ authors, users, providers, app }) {
    return {
        authors,
        users,
        providers,
        app
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default App;