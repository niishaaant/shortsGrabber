import React, { useState, useEffect } from 'react';
import './hero.scss';

import { isYtUrl } from '../utils/helper';
import Tool from '../tool/Tool';
import { getInfo } from '../utils/helper';
import Loading from './Loading';

const Hero = () => {
	const [finalLink, setFinalLink] = useState('');
	const [link, setLink] = useState('');
	const [valid, setValid] = useState(true);
	const [vidDetails, setVidDetails] = useState(null);
	const [vidFormats, setVidFormats] = useState(null);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);

	const handleLink = (e) => {
		const result = isYtUrl(e.target.value);
		setLink(e.target.value);
		if (result) {
			setValid(true);
		} else {
			setValid(false);
		}
	};

	const handleSubmit = async () => {
		const result = isYtUrl(link);
		if (!link.length) {
			setErr(true);
			return;
		}
		if (result) {
			setFinalLink(link);
			setErr(false);
			setLoading(true);
			try {
				const { data } = await getInfo(link);
				const {
					data: { videoDetails, player_response },
				} = data;
				setVidDetails(videoDetails);
				setVidFormats(player_response.streamingData);
				setLoading(false);
			} catch (error) {
				setErr(true);
				setLoading(false);
			}
		} else {
			console.log('not a valid Link');
		}
	};

	const handlePaste = async () => {
		const text = await navigator.clipboard.readText();
		const result = isYtUrl(text);
		setLink(text);
		if (result) {
			setValid(true);
		} else {
			setValid(false);
		}
	};

	const handleCancel = () => {
		setLink('');
	};

	useEffect(() => {
		handleSubmit();
	}, [link]);

	return (
		<>
			<div className='hero-container'>
				<div className='text-call'>
					<div className='h1 title gutter'>
						Download <span className='highlight'>Youtube videos</span> in the
						format you want it to be.
					</div>
					<div className='h5 sub-title gutter'>
						Wrapped around the ytdl and ffmpeg packages so completely{' '}
						<span className='highlight'>secure</span> and directly to your
						device without any third party API or cookies involved.
					</div>
					<div className='h6 review gutter'>
						<i className='fa fa-star' aria-hidden='true'></i>
						<i className='fa fa-star' aria-hidden='true'></i>
						<i className='fa fa-star' aria-hidden='true'></i>
						<i className='fa fa-star' aria-hidden='true'></i>
						<i className='fa fa-star' aria-hidden='true'></i>
						Trusted by 500+ active users.
					</div>
					<div className='form-container'>
						{/* Get Link */}
						<div className='form'>
							<input
								type='text'
								placeholder='Paste the video URL here'
								value={link}
								onChange={handleLink}
								className={valid ? '' : 'red-border'}
							/>
							{/* <button onClick={handleSubmit}>Search</button> */}
							<button
								onClick={link.length ? handleCancel : handlePaste}
								title={link.length ? 'Cancel' : 'Paste from clipboard'}
							>
								{link.length ? (
									<span>
										Cancel <i class='fa fa-times' aria-hidden='true'></i>
									</span>
								) : (
									<span>
										Paste from clipboard{' '}
										<i className='fa fa-clipboard' aria-hidden='true'></i>
									</span>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			{loading ? <Loading /> : ''}
			{finalLink.length && !loading && !err ? (
				<Tool Link={finalLink} details={vidDetails} allFormats={vidFormats} />
			) : (
				''
			)}
		</>
	);
};

export default Hero;
