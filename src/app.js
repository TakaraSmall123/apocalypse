import React from 'react'
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';

const historyApiFallback = require('connect-history-api-fallback');
const apiKey = '488227614eff4d30d16ad931527dc9a4';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            movies: [],
            userSelection: ''
        }

    // this.addItem= this.addItem.bind(this);
    this.getUsersChoice= this.getUsersChoice.bind(this);
     this.getMovie= this.getMovie.bind(this);
     // this.ZombieList= this.ZombieList.bind(this);
    }

    getUsersChoice(e){
        console.log(e.target.value);
        this.setState({
            userSelection: e.target.value
        })
    }

    getMovie(e) {
        e.preventDefault();
        console.log("working")
        if(this.state.getUsersChoice === "") {
        alert('you left the box empty')
        } else {
            ajax({
                url: 'https://api.themoviedb.org/3/search/movie',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    api_key: apiKey,
                    language: "en-US",
                    // sort_by: "popularity.desc",
                    include_adult: "false",
                    // page: "1",
                    total_results: "1",
                    query: this.state.userSelection
                }
            })
            .then((movieList) => {
                    console.log(`yo, this is the new clicks for the ${this.state.userSelection} data`, movieList);
                        this.setState({
                            movies: movieList.results
                        });
                });
        }
    }


    componentDidMount(){
        
        }

    render() {
		return (
			<div className="header">
				<div className="titlePageIntro">
                <div className="titlePageDescription">
                    <h1>Apocalypse Survival </h1>
                    <p>The all-you-need-to-know guide to survive the end of the world</p>
                    <p>(Choose your scenario below)</p>
            
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                    <form onSubmit={this.getMovie}>
                        <label>zombie</label>
                       <input type="radio" name="movies" value="zombie" onChange={this.getUsersChoice}/>
                        <label>alien</label>
                        <input type="radio" name="movies" value="alien" onChange={this.getUsersChoice}/>
                        <label>nuclear</label>
                        <input type="radio" name="movies" value="nuclear" onChange={this.getUsersChoice}/>
                        <input type="submit" />
                    </form>
                <div>
                  </div>
                    {this.state.movies.map((item) => {
                        console.log(item);
                        return <h2>{item.original_title}</h2>
                    })}
                </div>
                 </div>
                {this.props.children}
		   </div>
		)
	}
}

// Survival section
class Survival extends React.Component {
    render() {
        return (
            <div className="titlePageIntro">
                <div className="titlePageDescription">
                    <h1>Apocalypse Survival </h1>
                    <p>The all-you-need-to-know guide to survive the end of the world</p>
                </div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
            </div>
        )
    }
}

// 'ZombieList' section
const ZombieList = (props) => {
        return (
            <div className="ZombieList">
                <p>Deck of cards: While away the time playing with survivors</p>
                <p>Cast-iron skillet: Cooking tool and tool to neutralize zombies</p>
                <p>Shelter: Look for any items (garbage, bags, etc) that you can stitch together to turn into a house</p>
                {props.getMovie}
                </div>
        )
    }

// 'NuclearList' section
class NuclearList extends React.Component {
    render() {
        return (
            <div className="NuclearList">
                <p>Gun: Find your grandma's rifle and get ready to fight off those zombies </p>
                <p>Cloud watching: Pick an interestingly shaped one and ask everyone to say what they think it looks like </p>
                <p>Shelter: Grab as many sticks as you can find and then turn them into pile that can support a shelter</p>
            </div>
    )
}
    
}
// End of 'NuclearList' section

//'AlienList' section
class AlienList extends React.Component {
    render() {
        return (
            <div className="AlienList">
                <p>Gun: Find your grandma's rifle and get ready to fight off those zombies </p>
                <p>Cloud watching: Pick an interestingly shaped one and ask everyone to say what they think it looks like </p>
                <p>Shelter: Grab as many sticks as you can find and then turn them into pile that can support a shelter</p>
            </div>
        )
    }
     
}
// End of 'AlienList' section


ReactDOM.render(<Router history={browserHistory}>
 
    <Route path="/" component={App}>
        <Route path="/nuclear" component={NuclearList} />
        <Route path="/alien" component={AlienList} />
        <Route path="/zombie" component={ZombieList} />
        <Route path="/home" component={App} />
    </Route>
</Router>, document.getElementById('app'))


// http://blog.rei.com/social/infographic-13-essential-tools-for-surviving-a-zombie-outbreak/

// 1. DISPLAYING RETURNED MOVIES ON THE PAGE
// 2. LINKING PAGES TOGETHER USING REACT
//INVESTIGATE: Firebase on youtube (for the web on react)