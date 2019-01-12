const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

const dbRoute = 'mongodb://nohtaesang:shxotkd1!@ds249565.mlab.com:49565/lgosu';
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

mongoose
	.connect(dbRoute, { useNewUrlParser: true })
	.then(() => console.log('Successfully connected to mongodb'))
	.catch(e => console.error(e));

require('./routes')(app);

app.listen(port, () => console.log('Server listening on port ' + port));
