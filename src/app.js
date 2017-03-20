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
                    <h1>Apocalypse Survival</h1>
                    <p>The all-you-need-to-know guide to survive the end of the world</p>
                      <Link to="/zombie"><button className="zombie">ZOMBIE</button></Link>
                 {this.props.children}
                <Link to="/nuclear"><button className="nuclear" onClick={this.handleClickNuclear}>NUCLEAR SHOWDOWN</button></Link>
                 {this.props.children}
                <Link to="/alien"><button className="alien" onClick={this.handleClickAlien}>ALIEN INVASION</button></Link>
                 {this.props.children}
                </div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
            </div>
        )
    }
}

// class alienForm extends React.Component {
//   constructor() {
//     super()
//   }
//   render(){
//     return(
//     <div className="alienAnimated">
//        <Monster image="../src/images/alien.png" health={10} />
//     </div>
//     )
//   }
// }

//START OF ZOMBIE STUFF
class AlienForm extends React.Component {
      constructor() {
        super();
      }
      render(){
        return(
            <div className="alienAnimated">
                <Monster image="../src/images/zombie2.png" health={5} />
                <Monster image="../src/images/alien.png" health={10} />
            </div>
        )
    }

}

class ZombieForm extends React.Component {
      constructor() {
        super();

      }
      render(){
        return(
            <div className="zombieAnimated">
                <Monster image="../src/images/zombie2.png" health={5} name="Zombie"/>
                <Monster image="../src/images/alien.png" health={10} name=""/>
            </div>
        )
    }

}


class Monster extends React.Component {
    constructor() {
        super();
        this.state = {
            health: 3,
            image: "../src/images/zombie2.png"
        }
        this.takeDamage = this.takeDamage.bind(this);
    }
    takeDamage() {
        let health = this.state.health;
        let newHealth = health - 1;

        this.setState({
            health: newHealth
        });

        this.monster.classList.add('isHit');
        setTimeout(() => {
            this.monster.classList.remove('isHit');
        }, 300);

    }

    render() {
        return (
            <div className="monster" ref={element => { this.monster = element; }}>
                {this.state.health === 0 ?
                    <span>{this.props.name} Dead</span>
                :
                    <img src={this.state.image} onClick={this.takeDamage} /> 
                }
                <p>{this.state.health}</p>
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            health: this.props.health,
            image: this.props.image
        });

    }
}


// 'ZombieList' section
class ZombieList extends React.Component {
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
        //store returned data in state
        // const movieListData = movieList.val()
        //     for(let itemKey in movieListData) {

        //  }
            this.setState({
                movies: movieList.results

            });
                console.log(this.setState)
        });
    }

    
    render() {

        return (
            <div>
                <div className="ZombieList">
                    <h1> ZombieLand </h1>
                    <div className="ZombieParagraphs">
                    <p>Deck of cards: While away the time playing with survivors</p>
                    <p>Cast-iron skillet: Cooking tool and tool to neutralize zombies</p>
                    <p>Shelter: Look for any items (garbage, bags, etc) that you can stitch together to turn into a house</p>
                   
                <button className="ZombieButton" onClick={this.onClick.bind(this)}>I'm ready to kick zombie butt</button>{this.state.showZ && < ZombieForm / >}
                   

                {this.state.movies.map((movie) => { 
                    return <p>{movie.original_title}</p>
                })}

                 </div>

                <p></p>
                </div> 
            </div>  
        )
    }

}


//START OF NUCLEAR

// 'NuclearList' section
class NuclearList extends React.Component {
      constructor() {
    super();

    this.state = {
        movies: {},
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
            query: "alien"
        }
    }).then((movieList) => {
        console.log('this is a test yo nuclear killas', movieList)
        //store returned data in state
            this.setState({
                movies: movieList.results
            });
                    console.log(this.setState)
        });
    }

    render() {
        return (
            <div className="NuclearList">
                <p>Gun: Find your grandma's rifle and get ready to fight off those zombies </p>
                <p>Cloud watching: Pick an interestingly shaped one and ask everyone to say what they think it looks like </p>
                <p>Shelter: Grab as many sticks as you can find and then turn them into pile that can support a shelter</p>
                <button className="NuclearButton" onClick={this.onClick.bind(this)}>I'm ready to kick zombie butt</button>{this.state.showZ && < ZombieForm / >}
            </div>
        
    )
}
    
}
// End of 'NuclearList' section

//'AlienList' section
class AlienList extends React.Component {
    constructor() {
    super();

    this.state = {
        movies: {},
    }

}

   onClick(e){
    e.preventDefault();
    this.setState({showZ: !this.state.showZ})
  }

    render() {
        return (
            <div className="AlienList">
                <p>Gun: Find your grandma's rifle and get ready to fight off those zombies </p>
                <p>Cloud watching: Pick an interestingly shaped one and ask everyone to say what they think it looks like </p>
                <p>Shelter: Grab as many sticks as you can find and then turn them into pile that can support a shelter</p>
                <button className="AlienButton" onClick={this.onClick.bind(this)}>I'm ready to kick alien butt</button>{this.state.showZ && < ZombieForm />}
            </div>
        )
    }
     
}
// End of 'AlienList' section


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
// 3. //must find a way to get rid of uppercase Button problem.
// 4.  // http://codepen.io/anon/pen/KzrzQZ?editors=1010



//     handleClickZombie() {
//         ajax({
//         url: 'https://api.themoviedb.org/3/search/movie',
//         method: 'GET',
//         dataType: 'jsonp',
//         data: {
//             api_key: apiKey,
//             language: "en-US",
//             sort_by: "popularity.desc",
//             include_adult: "false",
//             page: "1",
//             query: "zombie"
//         }
//     }).then((movieList) => {
//         console.log('yo, this is the new clicks for the zombie data', movieList);
//             this.setState({
//                 movies: movieList.results
//             });
//     });

// }


// Button section
// class Button extends React.Component {

//      handleClickNuclear() {
//        ajax({
//         url: 'https://api.themoviedb.org/3/search/movie',
//         method: 'GET',
//         dataType: 'jsonp',
//         data: {
//             api_key: apiKey,
//             language: "en-US",
//             sort_by: "popularity.desc",
//             include_adult: "false",
//             page: "1",
//             query: "nuclear"
//         }
//         }).then((movieList) => {
//             console.log('yo, this is the new clicks for the nuclear list', movieList);
//             this.setState({
//                 movie: movieList.results
//             });
//         });
//     }
    

//     handleClickAlien() {
//       ajax({
//         url: 'https://api.themoviedb.org/3/search/movie',
//         method: 'GET',
//         dataType: 'jsonp',
//         data: {
//             api_key: apiKey,
//             language: "en-US",
//             sort_by: "popularity.desc",
//             include_adult: "false",
//             page: "1",
//             query: "alien"
//         }
//     }).then((movieList) => {
//         console.log('yo, this is the new clicks for the alien list', movieList);
//         this.setState({
//                 movie: movieList.results
//             });

//             });
//         }
    
//     render() {
//         return (
//             <div>
              
//             </div>
//         )
//     }
// }