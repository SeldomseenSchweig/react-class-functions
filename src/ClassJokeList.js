import React from "react";
import axios from "axios";
// import Joke from "./Joke";
import "./JokeList.css";


class ClassJokeList extends React.Component {

    constructor(props){
        super(props);
        this.state ={jokes: []};
        this.generateNewJokes = this.generateNewJokes.bind(this);
        this.getJokes =  this.getJokes.bind(this);
        this.vote = this.vote.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this)

 

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
            this.setState( { jokes: j } );
          } catch (e) {
            console.log(e);
          }

    }




    componentDidMount(){
        this.getJokes()
    };

    generateNewJokes() {
      let copyJokes = {jokes:[]}
      this.setState((jokes)=>{jokes = {}}) 
      console.log(this.state)
     

        this.getJokes();

    }
    vote(id, delta) {
       
        this.setState(allJokes =>{allJokes.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j ))

            }
        
        );

      }
  
    upVote(id) {
        this.vote(id.target.id, +1)
    }


    downVote(id) {

        this.vote(id.target.id, -1)
    }

    render(){
        let {jokes} = this.state
       
            let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
        
        return(
            <div className="JokeList">
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
              Get New Jokes
            </button>
      
            {sortedJokes.map(j => (
                    <div className="Joke">
                    <div className="Joke-votearea">
                      <button  onClick={this.upVote}>
                        <i id={j.id} className="fas fa-thumbs-up" />
                      </button>
              
                      <button  onClick={this.downVote}>
                        <i id={j.id} className="fas fa-thumbs-down" />
                      </button>
              
                      {j.votes}
                    </div>
              
                    <div className="Joke-text">{j.joke}</div>
                  </div>
            ))}
         </div>


        )



    }



}

export default ClassJokeList;