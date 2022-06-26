import React from 'react';
import Navbar from './Components/navbar/Navbar';
import Hero from './Components/hero/Hero';
import './App.scss';

const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Hero />
		</div>
	);
};

export default App;
