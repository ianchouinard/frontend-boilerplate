const express = require('express'),
app = express(),
router = express.Router(),
port = Number(process.env.PORT || 8000),
host = '0.0.0.0';

// Set Pug and the view engine
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/dev');

// Allow express to render static files (css/js/img/svgs/etc)
app.use(router);
app.use(express.static('dev'));

// Allow all possible methods
router.all('/', (req, res, next) => {
    next();
});

//route any name given after /
router.get('/:name?', (req, res) => {
    let view = 'index';

    if (req.params.name != null && req.params.name != "") {
        view = `App/Templates/${req.params.name}`;
    } else {
        view = `App/Templates/home`;
    }

    res.render(view, {compile: false});
});

// Listen
const server = app.listen(port, host, () => {
    console.log(`Listening on: http://localhost:${port}`);
});