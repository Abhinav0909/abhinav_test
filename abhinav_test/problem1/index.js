const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const fetchUrl = async (urlArr) => {
    console.log(urlArr);
    let resultArr = [];
    try {
        const res = await axios.all(urlArr.map((url) => axios.get(url)));
        const resArr = res.map((res) => res.data.numbers);
        resArr.forEach((res) => (resultArr = [...resultArr, ...res]));
    }
    catch (err) {
        console.log(err.message);
    }
    return [...new Set(resultArr.sort((a, b) => a - b))];
};

fetchUrl();

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    const response = await fetchUrl(urls);
    res.send(response);
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})