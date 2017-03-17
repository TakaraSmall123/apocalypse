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
            movies: []
    }

    // this.ZombieList = this.ZombieList.bind(this);
}

    render() {

    <div className='theseAreTheResultsThatAreReturned'>
            {this.state.movies.map((movie, i) => {
                return (
                    <div key={`movie-${i}`} className='movieReturnList'>
                    </div>
                )
            })}
    </div>
       
		return (
			<div className="header">
				<Survival/>
				<ZombieList/>
				<NuclearList/>
                <AlienList/>
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
    				<Button/>
                </div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
			</div>
		)
	}
}

// Button section
class Button extends React.Component {
    handleClickZombie() {
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
        console.log('yo, this is the new clicks for the zombie data', movieList);
        this.setState({
                movie: movieList.results
            });
        console.log('this is setState');
        });
    }

     handleClickNuclear() {
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
            query: "nuclear"
        }
        }).then((movieList) => {
            console.log('yo, this is the new clicks for the nuclear list', movieList);
        });
    }
    

    handleClickAlien() {
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
            query: "alien"
        }
    }).then((movieList) => {
        console.log('yo, this is the new clicks for the alien list', movieList);

            });
        }
    
    render() {
        return (
        	<div>
                <Link to="/zombie"><button className="zombie" onClick={this.handleClickZombie}>ZOMBIE</button></Link>
                 {this.props.children}
                <Link to="/nuclear"><button className="nuclear" onClick={this.handleClickNuclear}>NUCLEAR SHOWDOWN</button></Link>
                 {this.props.children}
                <Link to="/alien"><button className="alien" onClick={this.handleClickAlien}>ALIEN INVASION</button></Link>
                 {this.props.children}
            </div>
        )
    }
}

// 'ZombieList' section
class ZombieList extends React.Component {
      constructor() {
        super();
        this.state = {
            movies: {
            }
        }
    }
    render() {

        return (
        	<div className="ZombieList">
                <p>Deck of cards: While away the time playing with survivors</p>
                <p>Cast-iron skillet: Cooking tool and tool to neutralize zombies</p>
                <p>Shelter: Look for any items (garbage, bags, etc) that you can stitch together to turn into a house</p>
            </div>
        )
    }
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
//End of 'AlienList' section


ReactDOM.render(<Router history={browserHistory}>
    <Route path="/zombie" component={ZombieList}/>
    <Route path="/nuclear" component={NuclearList} />
    <Route path="/alien" component={AlienList} />
    <Route path="/" component={App}>
        <Route path="/home" component={App} />
    </Route>
</Router>, document.getElementById('app'))


// http://blog.rei.com/social/infographic-13-essential-tools-for-surviving-a-zombie-outbreak/

// 1. DISPLAYING RETURNED MOVIES ON THE PAGE
// 2. LINKING PAGES TOGETHER USING REACT
//INVESTIGATE: Firebase on youtube (for the web on react)