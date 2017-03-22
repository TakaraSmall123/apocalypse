import React from 'react'
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';

const historyApiFallback = require('connect-history-api-fallback');
const apiKey = '488227614eff4d30d16ad931527dc9a4';

export default class ZombieList extends React.Component {
  constructor() {
    super();
        this.state = {
            movies: [],
        }
    }

   onClick(e){
    e.preventDefault();
    this.setState({showZ: !this.state.showZ})
  }

    componentDidMount() {
            ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            dataType: 'jsonp',
            data: {
            api_key: apiKey,
            language: "en-US",
            sort_by: "popularity.desc",
            include_adult: "false",
            page: "1",
            query: "zombie"
        }
    }).then((movieList) => {
        console.log('this is a test yo zombie killas', movieList)
            this.setState({
                movies: movieList.results.splice(3, 6)
            });
                console.log(this.setState)
        });
    }
    
    render() {
        return (
            <div>
            <div className="zombieSection">
                 <h1> Zombie Invasion </h1>
                <div className="ZombieList">
                    <div className="zombieWrapper">
                        <h2>1. Your must-have pack</h2>
                        <div className="zombiePack">
                        <h3>Deck of cards:</h3> <p>While away the time playing with survivors</p>
                         <h3>Cast-iron skillet:</h3><p>Cooking tool and tool to neutralize zombies</p>
                        <h3>Shelter:</h3><p>Look for any items (garbage, bags, etc) that you can stitch together to turn into a house</p>
                        </div>
                        <Link to="/fight"><button className="ZombieButton2">Are you ready to practice?</button></Link>
                    </div>

                        <div className="zombieWrapper2">
                          <h2>2. Your must-see reference guide</h2>
                        {this.state.movies.map((movie) => { 
                        return <p className="movieListBox"> <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></p> 
                        })}

                        </div>
                    <div>

                </div>

            </div>
        </div>
                           
    </div>
             
        )
    }

}