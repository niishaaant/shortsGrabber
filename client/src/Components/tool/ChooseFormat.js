import React from 'react';

const ChooseFormat = ({ formatChange, format }) => {
	const handleFormatChange = (formatNo) => {
		formatChange(formatNo);
	};
	return (
		<div className='choose-format-container'>
			<button
				onClick={() => handleFormatChange(1)}
				className={format === 1 ? 'active' : ''}
			>
				Video
			</button>
			<button
				onClick={() => handleFormatChange(2)}
				className={format === 2 ? 'active' : ''}
			>
				Audio
			</button>
			<button
				onClick={() => handleFormatChange(3)}
				className={format === 3 ? 'active' : ''}
			>
				Video Without Audio
			</button>
		</div>
	);
};

export default ChooseFormat;
