import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../services/movieService.js";
import Like from './common/like.jsx';
import Pagination from './common/pagination.jsx';
import { paginate } from '../utils/paginate.js';
import ListGroup from './common/listGroup.jsx';
import { getGenres } from "../services/genreService.js";
import MoviesTable from './moviesTable.jsx';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox.jsx';
import { toast } from 'react-toastify';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],         
        pageSize: 4,
        currentPage: 1, 
        searchQuery: "",   
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'},
    } 

    render() { 
        const { user } = this.props;
        const {pageSize, currentPage, sortColumn } = this.state;

        const { totalCount, data: movies } = this.getPagedData();
        
        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        items={this.state.genres} 
                        selectedItem={this.state.selectedGenre}
                        onItemSelected={this.handleGenreSelected}/>
                </div>
                <div className="col">
                    {user && <Link to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}>
                            New Movie
                        </Link>}
                    <p>Showing {totalCount} movies in the database.</p>
                    
                    <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}/>

                    <MoviesTable 
                        movies={movies}
                        sortColumn={sortColumn} 
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort} />

                    <Pagination 
                        itemsCount={totalCount} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    }

    getPagedData = () => {
        const { pageSize, currentPage, selectedGenre, searchQuery, 
                movies: allMovies, sortColumn } = this.state;
        
        let filtered = allMovies;
        if(searchQuery)
        {
            filtered = allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if (selectedGenre && selectedGenre._id)
        {
            filtered = allMovies.filter(movie => movie.genre._id === selectedGenre._id);
        }
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{_id: "", name: 'All Genres'}, ...data];

        const { data: movies } = await getMovies()
        this.setState({movies: movies, genres});
    };

    handleSort = sortColumn => {        
        this.setState({ sortColumn });
    };

    handleGenreSelected = genre => {        
        this.setState({selectedGenre: genre, searchQuery : "", currentPage: 1});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };

    handleDelete = async movie => {
        const originalMovies  = this.state.movies;

        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies});

        try
        {
            await deleteMovie(movie._id);
        }
        catch(ex)
        {
            if(ex.response && ex.response.status === 404)
            {
                toast.error("This movie has already been deleted.");
            }
            this.setState({movies: originalMovies});
        }
    };

    handleLike = movie => {
        console.log("like clicked: ", movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies: movies});
    };

    renderMovies(){        
        const selectedGenre = this.state.selectedGenre;
        const allMovies = this.state.movies;
        const filtered = selectedGenre ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered, this.state.currentPage, this.state.pageSize);

        return movies.map(movie => (
            <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                </td>
                <td>
                    <button 
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        ) );
    };
}
 
export default Movies;