import './App.css';
import { Auth } from './components/Auth';
import { Movies } from './components/Movies';

function App() {
	return (
		<div className="App">
			<Auth />
			<Movies />
		</div>
	);
}

export default App;
