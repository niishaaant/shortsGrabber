import React, { useEffect } from 'react';
import {
	getDownloadUrlVWA,
	getDownloadUrlA,
	getDownloadUrlV,
} from '../utils/helper';

const Table = ({ formats, link, format }) => {
	const tags = (q) => {
		if (
			q.qualityLabel.slice(0, 4) == '1080' ||
			q.qualityLabel.slice(0, 4) == '1440'
		) {
			return (
				<span>
					{q.qualityLabel} <span className='HD'>HD</span>
				</span>
			);
		} else if (q.qualityLabel.slice(0, 4) == '2160') {
			return (
				<span>
					{q.qualityLabel} <span className='HD'>4K</span>
				</span>
			);
		} else if (q.qualityLabel.slice(0, 4) == '4320') {
			return (
				<span>
					{q.qualityLabel} <span className='HD'>8K</span>
				</span>
			);
		} else {
			return <span>{q.qualityLabel}</span>;
		}
	};

	return (
		<div>
			<table>
				<tr>
					<th>Quality</th>
					<th>Format</th>
					<th>File Size</th>
					<th>Action</th>
				</tr>

				{formats.map((f) => {
					if (f.qualityLabel) {
						return (
							<tr>
								<td>{tags(f)}</td>
								<td>{f.mimeType.slice(6, 10).replace(';', '')}</td>
								<td>{(f.contentLength / 1048576.0).toFixed(1)} MB</td>
								<td>
									{format === 1 ? (
										<a
											href={getDownloadUrlV(
												link,
												f.mimeType.slice(6, 10).replace(';', ''),
												f.itag
											)}
											download
										>
											Download{' '}
											<i className='fa fa-download' aria-hidden='true'></i>
										</a>
									) : (
										<a
											href={getDownloadUrlVWA(
												link,
												f.mimeType.slice(6, 10).replace(';', ''),
												f.itag
											)}
											download
										>
											Download{' '}
											<i className='fa fa-download' aria-hidden='true'></i>
										</a>
									)}
									{/* <a
										href={getDownloadUrlVWA(
											link,
											f.mimeType.slice(6, 10).replace(';', ''),
											f.itag
										)}
										download
									>
										Download{' '}
										<i className='fa fa-download' aria-hidden='true'></i>
									</a> */}
								</td>
							</tr>
						);
					} else if (f.audioChannels) {
						if (f.mimeType.slice(6, 9) == 'mp4') {
							return (
								<tr>
									<td>{f.audioQuality.slice(14)}</td>
									<td>mp3</td>
									<td>{(f.contentLength / 1048576.0).toFixed(1)} MB</td>
									<td>
										<a href={getDownloadUrlA(link, 'mp3', f.itag)} download>
											Download{' '}
											<i className='fa fa-download' aria-hidden='true'></i>
										</a>
									</td>
								</tr>
							);
						}
						return (
							<tr>
								<td>{f.audioQuality.slice(14)}</td>
								<td>{f.mimeType.slice(6, 10).replace(';', '')}</td>
								<td>{(f.contentLength / 1048576.0).toFixed(1)} MB</td>
								<td>
									<a
										href={getDownloadUrlA(
											link,
											f.mimeType.slice(6, 10).replace(';', ''),
											f.itag
										)}
										download
									>
										Download{' '}
										<i className='fa fa-download' aria-hidden='true'></i>
									</a>
								</td>
							</tr>
						);
					} else {
						return;
					}
				})}
			</table>
		</div>
	);
};

export default Table;
