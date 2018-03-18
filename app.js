const express = require('express');
const hbs = require('hbs');
const bodyParseer = require('body-parser');
const app = express();
const PORT = 8080;

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { hello: 'hi' });
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
//testing123
