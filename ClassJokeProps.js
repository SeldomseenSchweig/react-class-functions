import React from "react";
import "./Joke.css";
class ClassJokeProps extends React.Component {

  render(){

    <WrapperJokeList render ={ obj => (
      
    <div className="Joke">
        <div className="Joke-votearea">
            <button onClick={obj.upVote}>
              <i className="fas fa-thumbs-up" />
            </button>
            <button onClick={obj.downVote}>
              <i className="fas fa-thumbs-down" />
            </button>
          {obj.votes}
        </div>
      <div className="Joke-text">{obj.text}</div>
    </div>
    
    )}
    />
  }

  
}





export default ClassJokeProps;