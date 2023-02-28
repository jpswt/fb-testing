import React, { useEffect, useState } from 'react';
import Movie from './Movie';

import { db, auth, storage } from '../config/firebase';
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';

import { ref, uploadBytes } from 'firebase/storage';

export const Movies = () => {
	const [movieList, setMovieList] = useState([]);

	const [movieTitle, setMovieTitle] = useState('');
	const [releaseDate, setReleaseDate] = useState(0);
	const [winOscar, setWinOscar] = useState(false);

	const [updatedMovie, setUpdatedMovie] = useState('');

	const [fileUpload, setFileUpload] = useState(null);

	const movieCollectionRef = collection(db, 'movies');

	const onSubmitMovie = async () => {
		try {
			await addDoc(movieCollectionRef, {
				title: movieTitle,
				releaseDate: releaseDate,
				receivedAnOscar: winOscar,
				userId: auth?.currentUser?.uid,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const deleteMovie = async (id) => {
		const movieDoc = doc(db, 'movies', id);
		await deleteDoc(movieDoc);
	};

	const updateMovie = async (id) => {
		const movieDoc = doc(db, 'movies', id);
		await updateDoc(movieDoc, { title: updatedMovie });
	};

	const uploadFile = async () => {
		if (!fileUpload) {
			return;
		}
		const filesFolderRef = ref(storage, `movieImages/${fileUpload.name}`);
		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const getMovieList = async () => {
			try {
				const data = await getDocs(movieCollectionRef);
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				// console.log(filteredData);
				setMovieList(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		getMovieList();
	}, []);

	return (
		<React.Fragment>
			<div className="input">
				<input
					placeholder="Movie Title"
					onChange={(e) => setMovieTitle(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Release Date"
					onChange={(e) => setReleaseDate(Number(e.target.value))}
				/>
				<input
					type="checkbox"
					checked={winOscar}
					onChange={(e) => setWinOscar(e.target.checked)}
				/>
				<label>Received an Oscar</label>
				<button onClick={onSubmitMovie}>Submit Movie</button>
			</div>
			<div>
				{movieList.map((movie, key) => (
					// <div key={movie.id}>
					// 	<h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>
					// 		{movie.title}
					// 	</h1>
					// 	<p>Date: {movie.releaseDate}</p>
					// 	<button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

					// 	<input
					// 		type="text"
					// 		placeholder="new Title"
					// 		onChange={(e) => setUpdatedMovie(e.target.value)}
					// 	/>
					// 	<button onClick={() => updateMovie(movie.id)}>Update Title</button>
					// </div>
					<Movie
						movie={movie}
						deleteMovie={deleteMovie}
						setUpdatedMovie={setUpdatedMovie}
						updateMovie={updateMovie}
					/>
				))}
			</div>
			<div>
				<input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
				<button onClick={uploadFile}>Upload</button>
			</div>
		</React.Fragment>
	);
};
