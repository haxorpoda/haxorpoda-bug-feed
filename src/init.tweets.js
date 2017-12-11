#!/usr/bin/env node
const fs = require('fs');
const moment = require('moment');

const config = require('./config');

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
function zeroPad(num, size) {
  const s = `000000000${num}`;
  return s.substr(s.length - size);
}

const tweets = require(config.tweetsPath);
const tweetsIndex = new Set(tweets.map(({ img }) => img));

const currentDate = moment();
const postsPerDay = 4;
const timeInterval = 4;
let counter = 0;
const files = fs.readdirSync(`${config.dataDir}/img`);
shuffleArray(files);
const newTweets = files
	.filter(file => /\.png$/.test(file))
	.filter(file => !tweetsIndex.has(file))
	.slice(0,10)
	.map(file => {
		console.log('file ', file);
		if (counter === postsPerDay) {
			counter = 0;
			currentDate.add(1, 'd');
		}
		const sendTime = `${zeroPad(timeInterval*counter + 9, 2)}:${zeroPad(Math.floor((Math.random() * 40) + 1), 2)}`;
		++counter;
		const baseName = file.split('.')[0]
		return (tweet = {
			sendAfter: `${currentDate.format('YYYY-MM-DD')} ${sendTime}`,
			status: `http://eos.naturkundemuseum-berlin.de/result?DrawerCode=${baseName} #insects #nature`,
			alt_text: `Insect Image ${baseName}`,
			img: file,
		});
	});

const allTweets = [...tweets, ...newTweets];
allTweets.sort(function(a, b) {
	return a.sendAfter < b.sendAfter ? -1 : +1;
});

fs.writeFileSync(config.tweetsPath, `module.exports = ${JSON.stringify(allTweets, null, 2)};`);
process.stdout.write(`\nwrote file ${config.tweetsPath}\n`);
