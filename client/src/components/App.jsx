import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer'; 

const navList = [
                  {
                    name : "Home",
                    isActive : true,
                    isDisabled : false
                  },
                  {
                    name : "Playlists",
                    isActive : false,
                    isDisabled : true
                  },
                  {
                    name : "Subscriptions",
                    isActive : false,
                    isDisabled : false
                  },
                  {
                    name : "History",
                    isActive : false,
                    isDisabled : false
                  },
                  {
                    name : "Discussions",
                    isActive : false,
                    isDisabled : true
                  },
                  {
                    name : "Settings",
                    isActive : false,
                    isDisabled : true
                  }
                ];
                
// Placing temporarily imagelist and TILE_TYPE declaration in a high component to rain it done towards children components, since we don't have server side yet
const TILE_TYPE = {
                    Deletable : "Deletable",
                    Addable : "Addable"
                  };
const src = "http://vignette3.wikia.nocookie.net/onepiece/images/d/d1/Tome_1_Couverture_VO_Infobox.png/revision/latest?cb=20141025123521&path-prefix=fr";
const descr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum nulla malesuada metus porta, sit amet consequat nulla rhoncus. Cras ullamcorper auctor arcu, rutrum ultricies lacus vehicula cursus. Cras pretium, lectus vitae rhoncus dictum, ligula urna egestas nisi, eu gravida lorem quam sed risus. Morbi sed dolor placerat, lobortis quam varius, ultricies dolor. Praesent aliquam tempus orci, vitae rutrum ipsum semper vel. Vivamus nulla nisi, laoreet vel magna in, mollis egestas sapien. Sed sed tellus id nunc venenatis molestie. Vestibulum vehicula elit non elit maximus, a tempor lacus faucibus. ";
const tags = ["action","aventure","shonen", "comedy"];
const lastUpdate = "12/04/2016";
const views = 48542;
const chapterCount = 483;
const detailPage = "/detail?id="; //javascript:void()
const imageList = [
                    {
                      name : "One piece",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Naruto",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Bleach",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Hunter X Hunter",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Noblesse",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "The Gamer",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Ares",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    },
                    {
                      name : "Hajime no Ippo",
                      src : src,
                      detailPage : detailPage,
                      description : descr,
                      tags : tags,
                      lastUpdate : lastUpdate,
                      views : views,
                      chapterCount : chapterCount
                    }
                ];

class App extends React.Component { 
  constructor(props) {
    super(props);

   // Context allows to pass props directly from grandparent to grandchild without having to cascade the property to the parent
   // Reduces props nesting complexity
   this.constructor.childContextTypes = {
      imageList: React.PropTypes.array
      ,tileType : React.PropTypes.object
    };
  }
    
   getChildContext() {
    return { 
            imageList: imageList
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
      <PageContent navigationList={navList} navigationActive="Home">{children}</PageContent>
      <Footer /> 
    </div>
  )
  }
};

export default App;

