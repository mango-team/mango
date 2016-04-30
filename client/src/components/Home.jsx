import React from 'react';

import Slider from './Shared/Lists/Slider';

const Home = (props, context) => {
  return (
    <div className="pageContent">
          <h4>Welcome Home!</h4>
          <div className="allSliders">
            <Slider 
              imageList={context.imageList} 
              isBare={true} 
              tileType={context.tileType.Addable}  
              itemLimit="5" 
              name="RecentUpdates" 
              title="Recent updates" 
              linkTo="/Updates"
            />
            <Slider 
              imageList={context.imageList} 
              isBare={true} 
              tileType={context.tileType.Addable}  
              itemLimit="5" 
              name="ContinueReading" 
              title="Continue reading" 
              linkTo="/Continue"
            />
              <Slider 
              imageList={context.imageList} 
              isBare={true} 
              tileType={context.tileType.Addable}  
              itemLimit="5" 
              name="PersonnalSuggestion" 
              title="Our personnal suggestions to you" 
              linkTo="/Suggestions"
            />
              <Slider 
              imageList={context.imageList} 
              isBare={true} 
              tileType={context.tileType.Addable}  
              itemLimit="5" 
              name="RecommendedByFriends" 
              title="Recomented by your friends" 
              linkTo="/Recommended"
            />
           </div>
    </div>
        )
  };
  
  Home.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default Home;