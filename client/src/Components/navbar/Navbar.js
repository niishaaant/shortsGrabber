import React from 'react';
import './nav.scss';

const Navbar = () => {
	return (
		<>
			<div className='nav-container'>
				<div className='logo'>
					<span className='highlight'>Shorts</span>Grabber
				</div>
				<div className='links'>
					Language{' '}
					<i className='fa fa-angle-down highlight' aria-hidden='true'></i>
				</div>
			</div>
		</>
	);
};

export default Navbar;
