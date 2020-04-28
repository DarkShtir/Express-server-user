const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/export-router');
const path = require('path');
// require('dotenv').config({ path: '../config/' + process.env.env + '.env' });
// require('dotenv').config();
require('dotenv').config({
	path: path.join(__dirname + '/config/' + process.env.env + '.env'),
});
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8050;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use('/users', router.userRouter);
app.use('/pets', router.petRouter);
app.use('/upload', router.fileRouter);
app.use('/album', router.albumRouter);
app.use('/photo', router.photoRouter);
app.use('/dialogs', router.dialogRouter);
console.log(port);

console.log(path.join(__dirname + '/config/' + process.env.env + '.env'));
// console.log('/config/' + process.env.env + '.env');
// console.log(process.env);
console.log(process.env.PORT);
console.log(process.env.MONGO_DB);
async function start() {
	try {
		await mongoose.connect(process.env.MONGO_DB, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		app.listen(port, () => {
			console.log(`server on port ` + port);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
