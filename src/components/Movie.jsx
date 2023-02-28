import React from 'react';

const Movie = ({ movie, deleteMovie, setUpdatedMovie, updateMovie }) => {
	return (
		<div key={movie.id}>
			<h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>
				{movie.title}
			</h1>
			<p>Date: {movie.releaseDate}</p>
			<button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

			<input
				type="text"
				placeholder="new Title"
				onChange={(e) => setUpdatedMovie(e.target.value)}
			/>
			<button onClick={() => updateMovie(movie.id)}>Update Title</button>
		</div>
	);
};

export default Movie;
