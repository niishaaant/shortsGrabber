const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const contentDisposition = require('content-disposition');

router.get('/', async (req, res) => {
	const { v, q, f } = req.query;
	if (!ytdl.validateID(v) && !ytdl.validateURL(v)) {
		return res
			.status(400)
			.json({ success: false, error: 'No valid YouTube Id!' });
	}

	try {
		let info = await ytdl.getInfo(v);

		//set format and title
		const title = info.videoDetails.title;
		res.setHeader(
			'Content-disposition',
			contentDisposition(`${title}(ShortsGrabber.com).${f}`)
		);

		let format = ytdl.chooseFormat(info.formats, { quality: q });
		const video = ytdl(v, { format })
			.on('progress', (_, downloaded, total) => {
				console.log({ downloaded, total });
			})
			.pipe(res)
			.on('end', () => console.log('done'));
	} catch (error) {
		res.status(400);
		console.log('error ', error);
	}
});

module.exports = router;
