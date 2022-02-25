const express = require('express');
const app = express();
const cors = require('cors');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = ['bonfire', 'cardio', 'case', 'character', 'bonsai'];

const findUniquePrefix = (keyword) => {
	var start = 0;
	data.forEach((data) => {
		if ((data[start] = keyword[start])) {
			start++;
		}
	});
	return keyword.substr(0, start - 1);
};

const computePrefix = (keywords) => {
	let resultArr = [];
	const keywordArr = keywords.split(',');
	keywordArr.forEach((keyword) => {
		if (data.includes(keyword)) {
			resultArr.push({
				keyword,
				status: 'found',
				prefix: findUniquePrefix(keyword),
			});
		} else {
			resultArr.push({
				keyword,
				status: 'not_found',
				prefix: 'not_applicable',
			});
		}
	});

	return resultArr;
};

app.get('/prefixes', async (req, res) => {
	const keywords = req.query.keywords;
	console.log(keywords);
	const response = computePrefix(keywords);
	res.send(response);
});

app.listen(5001, () => {
	console.log('Server running on port 5001');
});