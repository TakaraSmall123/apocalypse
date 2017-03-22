import React from 'react'
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';
// import ZombieList from './components/ZombieList.js';

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

// SURVIVAL SECTION
class Survival extends React.Component {
    render() {
        return (
            <div className="titlePageIntro">
                <div className="titlePageDescription">
                    <h1>Apocalypse Survival</h1>
                    <p>The all-you-need-to-know guide to survive the end of the world.
                    </p>
                     <p>Pick your scenario:</p>
                     <div className="buttonHolder">
                      <Link to="/zombie"><button className="zombie"><img src="../src/images/zombieLogo.png"/>ZOMBIE </button></Link>
                 {this.props.children}

                <Link to="/nuclear"><button className="nuclear" onClick={this.handleClickNuclear}><img src="../src/images/rocketLogo.png"/>NUCLEAR SHOWDOWN</button></Link>
                 {this.props.children} 
                <Link to="/alien"><button className="alien" onClick={this.handleClickAlien}><img src="../src/images/alienLogo.png"/>ALIEN INVASION</button></Link>
                 {this.props.children}
                 </div>
                </div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
            </div>
        )
    }
}

//IMAGES THAT ARE APPEARING FIGHT SECTION
class NuclearForm extends React.Component {
      constructor() {
        super();
      }
      render(){
        return(
            <div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                <div className="fightBorder">
                    <div className="alienAnimated">
                        <Monster image="../src/images/zombie2.png" health={5} />
                        <Monster image="../src/images/alien.png" health={10} />
                    </div>
                </div>
            </div>
        )
    }

}

class AlienForm extends React.Component {
      constructor() {
        super();
      }
      render(){
        return(
            <div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                <div className="alienAnimated">
                    <Monster image="../src/images/zombie2.png" health={5} />
                    <Monster image="../src/images/alien.png" health={10} />
                </div>
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
            <div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                <div className="zombieAnimated">
                    <Monster image="../src/images/zombie2.png" className="zombAnimated" health={5} name="Zombie"/>
                    <Monster image="../src/images/TK2.png" className="girlAnimated" health={10} name="Alien"/>
                </div>
            </div>
        )
    }

}

//MONSTER BAKING OVEN
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
            <div className="monster" ref={element => {this.monster = element; }}>
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

        // setMonster(this.monster);
    }
}

class ZombieFightList extends React.Component {
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
  render() {
        return (
            <div>
            <nav className="homePageIntro">
                <Link to="/">Home</Link>
            </nav> 
            <div className="zombieFightSection">
            <button className="ZombieFightButton" onClick={this.onClick.bind(this)}>Click on the bad guy to win!</button>{this.state.showZ && < ZombieForm / >}
            </div>
            </div>
        )
    }
}

// ZOMBIE SECTION PAGES
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
            this.setState({
                movies: movieList.results.splice(0, 3)
            });
                console.log(this.setState)
        });
    } 
    render() {
        return (
            <div>
            <nav className="homePageIntro">
                <Link to="/">Home</Link>
            </nav> 
            <div className="zombieSection">
                 <h1> Zombie Attack!!! </h1>
                <div className="ZombieList">
                    <div className="zombieWrapper">
                        <h2>1. Review your must-have survival pack</h2>
                        <div className="zombiePack">
                        <p><span>Deck of cards:</span> While away the time playing with survivors</p>
                         <p><span>Cast-iron skillet:</span> Cooking tool and weapon to neutralize zombies</p>
                        <p><span>Shelter:</span> Look for any items (garbage, bags, etc) that you can stitch together to turn into temporary lodging</p>
                        </div>
                    </div>

                        <div className="zombieWrapper2">
                          <h2>2. Review your must-see reference movie guide</h2>
                        {this.state.movies.map((movie) => { 
                        return <p className="movieListBox"> <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></p> 

                        })}

                        </div>
                    <div>

                </div>

            </div>
             <Link to="/fightzombies"><button className="ZombieButton2">Are you ready to practice?</button></Link>
        </div>     
    </div>
             
        )
    }
}

//NUCLEAR FIGHT LIST
class NuclearFightList extends React.Component {
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
  render() {
        return (
            <div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                    <div className="nuclearFightSection">
                        <button className="nuclearFightButton" onClick={this.onClick.bind(this)}>Click on the bad guy to win!</button>{this.state.showZ && < NuclearForm / >}
                    </div>
            </div>
        )
    }
}

//NUCLEAR SECTION PAGES
class NuclearList extends React.Component {
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
            query: "nuclear"
        }
    }).then((movieList) => {
        console.log('this is a test yo nuclear killas', movieList)
            this.setState({
               movies: movieList.results.splice(0, 3)
            });
        });
    }
    render() {
        return (
            <div>
                <nav className="homePageIntro">
                    <Link to="/">Home</Link>
                </nav> 
                <div className="nuclearSection">
                <h1> Nuclear Showdown!!! </h1>
                <div className="nuclearList">
                <div className="nuclearWrapper">
                <h2>1. Review your must-have survival pack</h2>
                <div className="nuclearPack">
                <p><span>Flash cards:</span>Create your own game(s) while hiding out from mutants</p>
                 <p><span>Canned goods:</span> It'll be hard to find safe (edible) food that won't make you sick</p>
                <p><span>Shelter:</span> Live our your childhood dream of living underground and dig yourself a comfy lair</p>
                </div>
            </div> 
            <div className="nuclearWrapper2">
                          <h2>2. Review your must-see reference movie guide</h2>
                        {this.state.movies.map((movie) => { 
                        return <p className="movieListBox"> <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></p> 

                        })}

                        </div>
                    <div>

                </div>

            </div>
             <Link to="/fightnuclear"><button className="nuclearButton">Are you ready to practice?</button></Link>
        </div>     
        </div>
             
        )
    }
}

//ALIEN FIGHT LIST
class AlienFightList extends React.Component {
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
  render() {
        return (
            <div>
            <nav className="homePageIntro">
                <Link to="/">Home</Link>
            </nav> 
            <div className="alienFightSection">
            <button className="alienFightButton" onClick={this.onClick.bind(this)}>Click on the bad guy to win!</button>{this.state.showZ && < NuclearForm / >}
            </div>
            </div>
        )
    }
}


//'AlienList' section
class AlienList extends React.Component {
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
            query: "alien"
        }
    }).then((movieList) => {
        console.log('this is a test yo nuclear killas', movieList)
            this.setState({
               movies: movieList.results.splice(0, 3)
            });
        });
    }
    render() {
        return (
            <div>
            <nav className="homePageIntro">
                <Link to="/">Home</Link>
            </nav> 
            <div className="alienSection">
                <h1> Alien Invasion!!! </h1>
                <div className="alienList">
                <div className="alienWrapper">
               <h2>1. Review your must-have survival pack</h2>
                <div className="alienPack">
                <p><span>Robotic arms:</span> Forget playing any games, your only goal is to survive</p>
                 <p><span>Army rations:</span>If you can't find those dehydrate dry goods for future use</p>
                <p><span>Shelter:</span> Avoid any and all alien spacecrafts and settle for anything that will keep you out of sight</p>
                </div>
            </div> 
                <div className="alienWrapper2">
                          <h2>2. Review your must-see reference movie guide</h2>
                        {this.state.movies.map((movie) => { 
                        return <p className="movieListBox"> <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></p> 

                        })}

                        </div>
                    <div>

                </div>

            </div>
             <Link to="/fightaliens"><button className="alienButton">Are you ready to practice?</button></Link>
        </div>     
        </div>


        )
    }
     
}
// End of 'AlienList' section


ReactDOM.render(<Router history={browserHistory}>
    <Route path="/zombie" component={ZombieList}/>
        <Route path="/fightzombies" component={ZombieFightList} >
        <Route path="/home" component={App} />
    </Route>
    <Route path="/nuclear" component={NuclearList} />
        <Route path="/fightnuclear" component={NuclearFightList} >
    </Route>
   <Route path="/alien" component={AlienList} />
        <Route path="/fightaliens" component={AlienFightList} >
    </Route>
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
//5. Nopixel -rocket | TS Graphics
//6 button on page hover effect, border-radius