import React from 'react';
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
                      <Link to="/zombie"><button className="zombie"><img src="/src/images/zombieLogo.png" className="titleImageZombie"/>ZOMBIES</button></Link>
                 {this.props.children}

                <Link to="/nuclear"><button className="nuclear" onClick={this.handleClickNuclear}><img src="/src/images/rocketLogo.png" className="titleImage"/>NUCLEAR SHOWDOWN</button></Link>
                 {this.props.children} 
                <Link to="/alien"><button className="alien" onClick={this.handleClickAlien}><img src="/src/images/alienLogo.png" className="titleImage"/>ALIEN INVASION</button></Link>
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
                    <div className="zombieAnimated">
                        <Monster image="/src/images/rockets.png" health={5} name="Rocket"/>
                        <Monster image="/src/images/TKFight.png" health={10} name="Takara"/>
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
                <div className="zombieAnimated">
                    <Monster image="/src/images/alienFight.png" health={5} name="Alien" />
                    <Monster image="/src/images/TKFight.png" health={10} name="Takara" />
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
                <div> </div>
                    <Monster image="/src/images/zombieFight2.png" className="zombAnimated" health={5} name="Zombie"/>
                    <Monster image="/src/images/TKFight.png" className="girlAnimated" health={10} name="Takara"/>

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
            image: "/src/images/zombie2.png"
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
        }, 200);
    }

    render() {
        return (
            <div className="monster" ref={element => {this.monster = element; }}>
                {this.state.health === 0 ?
                    <span className ="congrats">Congrats! The {this.props.name} is dead </span>
                :
                    <img src={this.state.image} onClick={this.takeDamage} /> 
                }
                <p> {this.props.name}'s health: <span>{this.state.health}</span></p>
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
                movies: movieList.results.splice(0, 1)
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
                <div className="zombieList">
                    <div className="zombieWrapper">
                    <h2>Survival pack item #1</h2>
                        <p><span>Deck of cards:</span><img src="/src/images/poker.png"/>Cards are a great weapon for use against boredom. It can be somewhat difficult for survivors to find something to occupy themselves while they wait for someone to save them. Some great games include Cards Against Humanity, Ace of Death, Gloom.</p>
                    </div>
                    <div className="zombieWrapper">
                    <h2>Survival pack item #2</h2>
                        <p><span>Cast-iron skillet:</span><img src="/src/images/pan.png"/>The undead are notoriously difficult to kill, the base reason being because they are already dead. In order to kill a zombie you’ll need to do some extensive damage to the thing that’s keeping them alive: their brain. A pan will not only serve as a cooking tool and weapon to smash zombies to bits.</p>
                     </div>
                     <div className="zombieList2">
                        <h2>Must-see movie guide</h2>
                        <div className="zombieWrapper2">
                        {this.state.movies.map((movie) => { 
                        return  <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/> 
                        })}
                        </div>
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
               movies: movieList.results.splice(1, 1)
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
                    <h2>Survival pack item #1</h2>
                        <p><span>Shovel:</span><img src="/src/images/shovel.png"/>When hellfire rains down from the sky you'll need to make sure you have an underground lair to hide out in. A shovel will act as a great defensive weapon and tool to help you dig out your new, ahem, digs. Pros: No need to ever worry about your home getting dirty since you'll literally be surrouned by it. Con: You'll have to live underground (bugs, yuck!)</p>
                    </div>
                    <div className="nuclearWrapper">
                    <h2>Survival pack item #2</h2>
                        <p><span>Toilet paper:</span><img src="/src/images/toilet-paper.png"/> At the end of the world basic luxuries like toilet paper will become extremely valuable. Ditch the gold, silver (or whatever precious metal you have) and stock on up toilet paper. Trust us, if the end actually does come you'll end up living like a King or Queen if you've stockpiled this basic item</p>
                     </div>
                     <div className="nuclearList2">
                        <h2>Must-see movie guide</h2>
                        <div className="nuclearWrapper2">
                        {this.state.movies.map((movie) => { 
                        return  <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/> 
                        })}
                        </div>
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

//     render() {
//         return (
//             <div>
//                 <nav className="homePageIntro">
//                     <Link to="/">Home</Link>
//                 </nav> 
//                 <div className="nuclearSection">
//                     <h1> Nuclear Showdown!!! </h1>
//                 <div className="nuclearList">
//                 <div className="nuclearWrapper">
//                     <h2>Survival item #1</h2>
//                     <p><span>Flash Cards:</span>Cards are a great weapon for use against boredom. It can be somewhat difficult for survivors to find something to occupy themselves while they wait for someone to save them. Some great games include Cards Against Humanity, Ace of Death, Gloom.</p>
//                 </div>
//                 <div className="nuclearWrapper">
//                     <h2>Survival pack item #2</h2>
//                     <p><span>Canned goods:</span> It'll be hard to find safe (edible) food that won't make you sick</p>
//                 </div>
//                 <div className="nuclearList2">
           
//             <div className="nuclearList2">
//                           <h2>Must-see movie guide</h2>
//                         {this.state.movies.map((movie) => { 
//                         return <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/> 
//                         })}
//                         </div>
//                         </div>
//                     <div>
//                 </div>
//             </div>
//              <Link to="/fightnuclear"><button className="nuclearButton">Are you ready to practice?</button></Link>
//             </div>    
//             </div>    
//         )
//     }
// }

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
            <button className="alienFightButton" onClick={this.onClick.bind(this)}>Click on the bad guy to win!</button>{this.state.showZ && < AlienForm / >}
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
               movies: movieList.results.splice(0, 1)
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
                 <h1> Alien Invasion!!! </h1>
                <div className="nuclearList">
                    <div className="nuclearWrapper">
                    <h2>Survival pack item #1</h2>
                        <p><span>Water (tap or bottled):</span><img src="/src/images/water.png"/>Cards are a great weapon for use against boredom. It can be somewhat difficult for survivors to find something to occupy themselves while they wait for someone to save them. Some great games include Cards Against Humanity, Ace of Death, Gloom.</p>
                    </div>
                    <div className="nuclearWrapper">
                    <h2>Survival pack item #2</h2>
                        <p><span>Full-loaded SUV:</span><img src="/src/images/car.png"/> The undead are notoriously difficult to kill, the base reason being because they are already dead. In order to kill a zombie you’ll need to do some extensive damage to the thing that’s keeping them alive: their brain. A pan will not only serve as a cooking tool and weapon to smash zombies to bits.</p>
                     </div>
                     <div className="nuclearList2">
                        <h2>Must-see movie guide</h2>
                        <div className="nuclearWrapper2">
                        {this.state.movies.map((movie) => { 
                        return  <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/> 
                        })}
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <Link to="/fightaliens"><button className="nuclearButton">Are you ready to practice?</button></Link>
            </div>
        </div>     
    
        )
    }
}
//     render() {
//         return (
//             <div>
//             <nav className="homePageIntro">
//                 <Link to="/">Home</Link>
//             </nav> 
//             <div className="alienSection">
//                 <h1> Alien Invasion!!! </h1>
//                 <div className="alienList">
//                 <div className="alienWrapper">
//                <h2>1. Review your must-have survival pack</h2>
//                 <div className="alienPack">
//                 <p><span>Robotic arms:</span> Forget playing any games, your only goal is to survive</p>
//                  <p><span>Army rations:</span>If you can't find those dehydrate dry goods for future use</p>
//                 <p><span>Shelter:</span> Avoid any and all alien spacecrafts and settle for anything that will keep you out of sight</p>
//                 </div>
//             </div> 
//                 <div className="alienWrapper2">
//                           <h2>2. Review your must-see reference movie guide</h2>
//                         {this.state.movies.map((movie) => { 
//                         return <p className="movieListBox"> <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}/></p> 

//                         })}

//                         </div>
//                     <div>

//                 </div>

//             </div>
//              <Link to="/fightaliens"><button className="alienButton">Are you ready to practice?</button></Link>
//         </div>     
//         </div>


//         )
//     }
     
// }
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
//5. Nopixel -rocket | TS Graphics | Noun Project
//6 button on page hover effect, border-radius
// by AFY Studio
// Arthur Shlain
// Philip Glenn
// by Iconic
// Roundicon
// <div>Icons made by <a href="http://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>