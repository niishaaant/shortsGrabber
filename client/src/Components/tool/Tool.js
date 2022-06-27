import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import Table from './Table';
import ChooseFormat from './ChooseFormat';
import './tool.scss';

const Tool = ({ Link, details, allFormats }) => {
	const [format, setFormat] = useState(3);
	const [formats, setFormats] = useState(allFormats.formats);
	useEffect(() => {
		if (format == 3) {
			setFormats(
				allFormats.adaptiveFormats.filter((d) => {
					return d.mimeType[0] == 'v';
				})
			);
		} else if (format == 2) {
			setFormats(
				allFormats.adaptiveFormats.filter((d) => {
					return d.audioChannels;
				})
			);
		} else if (format == 1) {
			setFormats(allFormats.formats);
		}
		// console.log(formats);
	}, [format]);

	const prev = (L) => {
		if (details.embed.iframeUrl.length) {
			return <Preview URL={details.embed.iframeUrl} />;
		} else {
			return <div className='negetive-preview'>No result found.</div>;
		}
	};

	return (
		<>
			<div className='tool-container'>
				<div className='preview'>
					<div>{prev(Link)}</div>
					<div className='title'>{details.title}</div>
					<div className='author'>
						{details?.author?.name || details?.author?.user}
					</div>
				</div>
				<div className='table'>
					<ChooseFormat formatChange={setFormat} format={format} />
					<Table formats={formats} link={Link} format={format} />
				</div>
			</div>
		</>
	);
};

export default Tool;
