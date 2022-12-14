const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

// database connection
//const dbURI = 'mongodb+srv://AliMarwana:Ali2019@cluster0.z4hsiro.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
// mongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function (error, client) {
// });
mongoose.connect("mongodb://localhost:27017", {
  serverSelectionTimeoutMS: 5000
})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// routes
//app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes)

