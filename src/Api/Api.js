export const apiKey = '888fc1dd6eab2ae6622c2823f98bbdd6';

export const getPopularMoviesUrl = () => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
};

export const general = () => {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
};

export const Nowplaying=()=>{
return `https://api.themoviedb.org/3/movie/now_playing?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`
}


export const Toprated=()=>{return `https://api.themoviedb.org/3/movie/top_rated?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`};


export const upcoming=()=>{return `https://api.themoviedb.org/3/movie/upcoming?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`};



export const people=(id)=>{return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`}

export const Similar=(id)=> {return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`}


export const Person=(id)=>{return `
https://api.themoviedb.org/3/person/${id}?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`}

export const Personmovies=(id)=>{return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=888fc1dd6eab2ae6622c2823f98bbdd6`}




export const fallbackMoviePoster = 'https://cdn.dribbble.com/users/1180484/screenshots/3810974/media/dccde7d94e128d6653258aa4bf64e6f4.png?resize=400x300&vertical=center';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';
