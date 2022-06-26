const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

//initialize middleware
app.use(express.json());

//define routes
app.use('/api/getInfo', require('./routes/APIs/getInfo'));
app.use('/api/startDownloadAudio', require('./routes/APIs/startDownlaodAudio'));
app.use('/api/startDownloadVideo', require('./routes/APIs/startDownloadVideo'));
app.use(
	'/api/startDownloadVideoWA',
	require('./routes/APIs/startDownloadVideoWA')
);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`listning to port ${PORT}`));
