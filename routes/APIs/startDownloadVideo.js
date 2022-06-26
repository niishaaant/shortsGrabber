const express = require('express');
const fs = require('fs');
const router = express.Router();
const ytdl = require('ytdl-core');
const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');

router.get('/', async (req, res) => {
	const { v, f, q } = req.query;
	if (!ytdl.validateID(v) && !ytdl.validateURL(v)) {
		return res
			.status(400)
			.json({ success: false, error: 'No valid YouTube Id!' });
	}
	try {
		let info = await ytdl.getInfo(v);

		//set format and title
		// const title = info.videoDetails.title;
		// res.setHeader('Content-disposition', contentDisposition(`${title}${f}`));

		//define audio and video stream seperately and download them
		const audio = ytdl(v, { quality: 'highestaudio' }).on(
			'progress',
			(_, downloaded, total) => {
				console.log({ downloaded, total });
			}
		);
		let format = ytdl.chooseFormat(info.formats, { quality: q });
		const video = ytdl(v, { format }).on('progress', (_, downloaded, total) => {
			console.log({ downloaded, total });
		});

		const ffmpegProcess = cp.spawn(
			ffmpeg,
			[
				// Remove ffmpeg's console spamming
				'-loglevel',
				'8',
				'-hide_banner',
				// Redirect/Enable progress messages
				'-progress',
				'pipe:3',
				// Set inputs
				'-i',
				'pipe:4',
				'-i',
				'pipe:5',
				// Map audio & video from streams
				'-map',
				'0:a',
				'-map',
				'1:v',
				// Keep encoding
				'-c:v',
				'copy',
				// Define output file
				`ot.${f}`,
			],
			{
				windowsHide: true,
				stdio: [
					/* Standard: stdin, stdout, stderr */
					'inherit',
					'pipe',
					'inherit',
					/* Custom: pipe:3, pipe:4, pipe:5 */
					'pipe',
					'pipe',
					'pipe',
				],
			}
		);

		ffmpegProcess.stdout.pipe(res);

		ffmpegProcess.on('close', () => {
			console.log('done');
		});

		// Link streams
		// FFmpeg creates the transformer streams and we just have to insert / read data
		ffmpegProcess.stdio[3].on('data', (chunk) => {
			// Parse the param=value list returned by ffmpeg
			const lines = chunk.toString().trim().split('\n');
			const args = {};
			for (const l of lines) {
				const [key, value] = l.split('=');
				args[key.trim()] = value.trim();
			}
		});
		audio.pipe(ffmpegProcess.stdio[4]);
		video.pipe(ffmpegProcess.stdio[5]);
	} catch (error) {
		res.status(400);
		console.log('error ', error);
	}
});

module.exports = router;
