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
                <div className="nuclearSection">
                <h1> Nuclear Showdown!!! </h1>
                <div className="nuclearList">
                <div className="nuclearWrapper">
                <h2>1. Review your must-have survival pack</h2>
                <div className="nuclearPack">
                <p><span>Deck of cards:</span> While away the time playing with survivors</p>
                 <p><span>Cast-iron skillet:</span> Cooking tool and tool to neutralize zombies</p>
                <p><span>Shelter:</span> Look for any items (garbage, bags, etc) that you can stitch together to turn into a house</p>
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