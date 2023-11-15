// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config');
const { User, Post, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Serve static files from the public folder
app.use(express.static('public'));

// Set up Express session
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Set up routes
app.use(require('./controllers/apiRoutes'));
app.use(require('./controllers/htmlRoutes'));

// Sync the Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});