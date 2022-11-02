import React from "react";
import axios from "axios";
// import Joke from "./Joke";
import "./JokeList.css";


class ClassJokeList extends React.Component {

    constructor(props){
        super(props);
        this.state ={jokes: []}
        this.generateNewJokes = this.generateNewJokes.bind(this)
        this.getJokes =  this.getJokes.bind(this)

 

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
        this.getJokes();
        console.log(this.state.jokes);


    }

    render(){
        let {jokes} = this.state
       
            let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
            console.log(sortedJokes)
        
        return(
            <div className="JokeList">
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
              Get New Jokes
            </button>
      
            {sortedJokes.map(j => (
                <h1> {j.joke}</h1>
            ))}
         </div>


        )



    }



}

export default ClassJokeList;