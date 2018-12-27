import axios from "axios";

export default {
  user: {
    login: credentials => {
      // send ajax for get user info which was loged
      // axios.post("/api/auth", { credentials }).then(res => res.data.user),
      
      // simulate server side work for getting loged user info(use localStorage)
      const users = JSON.parse(localStorage.getItem('users'));
      let logingUser = null;
      for(let i=0;i<users.length;i++) {
        if ( credentials.email == users[i].email && credentials.password == users[i].password ){
          logingUser = users[i];
        } 
      }

          return new Promise((resolve, reject) => {
            setTimeout(()=> {
            return resolve(logingUser);
            }, 500)

          })
    },
    signup: user => {

      //store new user in localStorage
      let userToStore  = user;
      delete userToStore['repeat_password'];
      
      let users = JSON.parse(localStorage.getItem('users'));
      users.push(userToStore)
      localStorage.setItem("users", JSON.stringify(users));

      return new Promise((resolve, reject) => {
          setTimeout(()=> {
          return resolve(userToStore);
          }, 500)
      })
	  // send request to server to store new user
      // axios.post("/api/users", { user }).then(res => res.data.user)
    }
  },
  movie: {
  	// fetchAll: () => axios.get("/api/books").then(res => res.data.books),
    fetchAll: userId => {
      
      //fetched all movies one user with userId(userEmail) from localStorage
      let allMovies = JSON.parse(localStorage.getItem('movies'));
      let usersMovies = [];
      // console.log('moviesS', movies);
      for(let i=0;i<allMovies.length;i++) {
        if( allMovies[i].userEmail == userId ) {
          usersMovies = allMovies[i].usersMovies;
        }
      }
      
      return new Promise((resolve, reject) => {
        setTimeout(()=> {
          return resolve(usersMovies);
        }, 500)
      })
    }
  	,
    addMovie: dataForAddMovie => {
      let newMovie = dataForAddMovie;
      let isUserMoviesExist = false;
      
      let moviesAllUsers = JSON.parse(localStorage.getItem('movies'));//array
      let userId = dataForAddMovie.userEmail;

      // find in localStorage movie list by userEmail and store there new movie data
      for(let i = 0; i<moviesAllUsers.length; i++) {
        if ( moviesAllUsers[i].userEmail == userId ) {
          delete newMovie.userEmail;
          moviesAllUsers[i].usersMovies.push( newMovie );
          localStorage.setItem("movies", JSON.stringify(moviesAllUsers));
          isUserMoviesExist = !isUserMoviesExist;
        } 
      }
      // create movie's list for new user
      if ( !isUserMoviesExist ) {
        delete newMovie.userEmail;
        let userMoviesObj = {
          userEmail: userId, 
          usersMovies: [newMovie]
        }
        moviesAllUsers.push( userMoviesObj );
        localStorage.setItem("movies", JSON.stringify( moviesAllUsers ));
      }

      return new Promise((resolve, reject) => {
        setTimeout(()=> {
          return resolve(newMovie);
        }, 500)
      })
      // axios.post("/api/add/movie", { newMovie }).then(res => res.data.newMovie)

    },
    clearAllMovies: userId => {
      let moviesAllUsers = JSON.parse(localStorage.getItem('movies'));//array
      // clear list of movies in localStorage
      for(let i = 0; i<moviesAllUsers.length; i++) {
        if ( moviesAllUsers[i].userEmail == userId ) {
          moviesAllUsers[i].usersMovies.length = 0;
          localStorage.setItem("movies", JSON.stringify(moviesAllUsers));
        } 
      }
      return new Promise((resolve, reject) => {
        setTimeout(()=> {
          return resolve([]);
        }, 500)
      })
      // axios.post("/api/clear/movies", { userId }).then(res => res.data.status)
    }

  }
};
