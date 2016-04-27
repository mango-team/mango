import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const TILE_TYPE = {
                    Deletable : "Deletable",
                    Addable : "Addable",
                    Informable : "Informable"
                  };
const src = "http://vignette3.wikia.nocookie.net/onepiece/images/d/d1/Tome_1_Couverture_VO_Infobox.png/revision/latest?cb=20141025123521&path-prefix=fr";
const descr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dictum nulla malesuada metus porta, sit amet consequat nulla rhoncus. Cras ullamcorper auctor arcu, rutrum ultricies lacus vehicula cursus. Cras pretium, lectus vitae rhoncus dictum, ligula urna egestas nisi, eu gravida lorem quam sed risus. Morbi sed dolor placerat, lobortis quam varius, ultricies dolor. Praesent aliquam tempus orci, vitae rutrum ipsum semper vel. Vivamus nulla nisi, laoreet vel magna in, mollis egestas sapien. Sed sed tellus id nunc venenatis molestie. Vestibulum vehicula elit non elit maximus, a tempor lacus faucibus. ";
const tags = ["action","aventure","shonen", "comedy"];
const lastUpdate = "12/04/2016";
const views = 48542;
const chapterCount = 483;
const detailPage = "/Detail?id="; //javascript:void()
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

const Home = (props) => {
  return (<div>
          <h4>Welcome Home!</h4>
          <Gallery imageList={imageList} isBare={true} tileType={TILE_TYPE.Deletable} />
        </div>
        )
  };

export default Home;