# Haxorpoda Collective - bug-feed

We tweet beautiful handpicked images of insects from the Natural Science History Museum Berlin.


# [twitter.com/haxorpoda](https://twitter.com/haxorpoda)

## Motivation

This project was created during the [Coding Da Vinci](https://codingdavinci.de/) hackaton 2017 using the MfNB high resolution insect images dataset.

The scripts are base on the [Berliner Schlagzeilen](https://github.com/shoutrlabs/berliner-schlagzeilen) bot.

## Community

Add your ideas and questions to our [issue tracker](https://github.com/haxorpoda/haxorpoda-bug-feed/issues).

Talk to us directly, join our chat on [slack](https://join.slack.com/t/cdvb17/shared_invite/enQtMjU5OTM1MzkwNzM5LTQ1N2MzYWY4MmNhYjM0NTYyZTNhMGYyOWVmNzVkYjRiOTJlMmEwOTA0YjkyMjViMWZkNzBkNzZiOWYwNGJmM2U).

## Installation

Clone the git project.
```
git clone git@github.com:haxorpoda/haxorpoda-bug-feed.git
```

Go to the new directory.
```
cd haxorpoda-bug-feed
```

Install all dependecies.
```
npm i
```


## Running

Create the image directory.
```
mkdir data/img
```

After adding images create tweets with
```
./src/init.tweets.js
```

The script extends the `data/tweets.js` file. The messages have to be written manually (the `status` field needs to be extended). This is an example entry.

```
{
		"sendAfter": "2017-11-06 19:35",
		"status": "http://zefys.staatsbibliothek-berlin.de/kalender/auswahl/date/1917-11-06/27971740",
		"alt_text": "Berliner Volkszeitung 06.11.1917 Abend-Ausgabe",
		"img": "1917-11-06.2.png",
		"tweetId": 0
	}
```

To send tweets run.

```
node ./src/tweet.js
```

The script checks if there is a tweet with a date-time lower than the current date-time in `sendAfter` and a falsy `tweetId`. As soon as a tweet is successfully send the `tweetId` is filled. If there was an error sending the tweet an `error` field is added to the tweet.

```
{
		"sendAfter": "2017-11-02 19:35",
		"status": "Hertling Reichskanzler. 02.11.1917 http://zefys.staatsbibliothek-berlin.de/kalender/auswahl/date/1917-11-02/27971740",
		"alt_text": "Berliner Volkszeitung 02.11.1917 Abend-Ausgabe",
		"img": "1917-11-02.2.png",
		"error": "Error: ENOENT: no such file or directory, open '/home/select/Dev/berliner-schlagzeilen/src/../data/img/1917-11-02.2.png'"
	},
```

Also tweets containing an `error` will be skipped.

To automate sending tweets we create a cronjob that tries to tweet every x minutes

```
# To create the coronjob run the followin command
# crontab -e
# then add the following line (and adapt the paths)
*/15 * * * *  /path/to/src/tweet.js >> /path/to/log/cron.log 2>&1
```


