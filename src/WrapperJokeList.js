import React from "react";
import axios from "axios";
// import Joke from "./Joke";
import "./JokeList.css";


class WrapperJokeList extends React.Component {

    constructor(props){
        super(props);
        this.state = {jokes: []};
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.getJokes =  this.getJokes.bind(this);
        this.sortJokes = this.sortJokes.bind(this);
        this.vote = this.vote.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this) ;
          }
    async getJokes (){
        let numJokesToGet = 10
        const {jokes} = this.state
        let j = [...jokes]
        let seenJokes = new Set();

        try {
            while (j.length < numJokesToGet) {
              let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
              });
              let { status, ...jokeObj } = res.data;
      
              if (!seenJokes.has(jokeObj.id)) {
                seenJokes.add(jokeObj.id);
                j.push({ ...jokeObj, votes: 0 });
              } else {
                console.error("duplicate found!");
              }
            }
            console.log(j)
            this.setState( { jokes: j } );
          } catch (e) {
            console.log(e);
          }

    }


    componentDidMount(){
        this.getJokes()
    };

    generateNewJokes() {
        this.setState( { jokes: [] } );
        this.getJokes();
    }
    sortJokes(){
      let {jokes} = this.state
       
      let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
      return sortedJokes

    }
    vote(id, delta) {
      this.setState(allJokes =>
        allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
      );
    }

    upVote(id) {this.vote(id, +1)}
    downVote(id) {this.vote(id, -1)}





    render(){
      let sortedJokes = this.sortJokes()
        return(
            <div className="JokeList">
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
              Get New Jokes
            </button>
              <div>
                { 
                  sortedJokes.map(j => ( 
                  this.props.render({   
                    
                      text:j.joke,
                      key: j.id,
                      id: j.id,
                      votes: j.votes,
                      vote:this.vote,
                      upVote:this.upVote,
                      downVote:this.downVote
                  }

                )))}
                    </div>
              </div>
         )
}
}


export default WrapperJokeList;