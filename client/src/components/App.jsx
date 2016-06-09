import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer'; 
import NavList  from '../data/Navigations';
import ImageList  from '../data/Images';

  // Placing temporarily imagelist and TILE_TYPE declaration in a high component to rain it done towards children components, since we don't have server side yet
  const TILE_TYPE = {
                      Deletable : "Deletable",
                      Addable : "Addable"
                    };
               
class App extends React.Component { 
  constructor(props) {
    super(props);

    // Context allows to pass props directly from grandparent to grandchild without having to cascade the property to the parent
    // Reduces props nesting complexity
    this.constructor.childContextTypes = {
      imageList: React.PropTypes.array
      , tileType: React.PropTypes.object
    };
  }
   
   getChildContext() {
    return { 
            imageList: ImageList
            ,tileType : TILE_TYPE 
          };
  }
  render() {
    var {
      children
    } = this.props;
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header userLoggedIn={false} />
      <PageContent navigationList={NavList} navigationActive="Home">{children}</PageContent>
      <Footer /> 
    </div>
  )
  }
};

export default App;

