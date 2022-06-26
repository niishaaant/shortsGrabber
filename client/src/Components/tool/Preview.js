import React from 'react';

const Preview = ({ URL }) => {
	return (
		<div className='responsive'>
			<iframe
				width='853'
				height='480'
				src={URL}
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='Embedded youtube'
			/>
		</div>
	);
};

export default Preview;
