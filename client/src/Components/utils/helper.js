import axios from 'axios';

export const isYtUrl = (url) => {
	const ytRegex = new RegExp(
		/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/g
	);
	return ytRegex.test(url);
};

//APIs

export const isLocalHost = window.location.hostname === 'localhost';

const host = isLocalHost
	? 'http://localhost:5000'
	: `https://${window.location.hostname}`;

export const API = axios.create({
	baseURL: host,
	responseType: 'json',
});

export const getInfo = async (url) => {
	return await API.get(`/api/getInfo?v=${url}`);
};

export const getDownloadUrlVWA = (videoURL, format, quality) =>
	`${host}/api/startDownloadVideoWA?v=${videoURL}&q=${quality}&f=${format}`;

export const getDownloadUrlV = (videoURL, format, quality) =>
	`${host}/api/startDownloadVideo?v=${videoURL}&q=${quality}&f=${format}`;

export const getDownloadUrlA = (videoURL, format, quality) =>
	`${host}/api/startDownloadAudio?v=${videoURL}&q=${quality}&f=${format}`;
