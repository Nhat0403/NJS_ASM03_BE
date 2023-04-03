const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const authRoutes = require('./routers/auth');
const productRoutes = require('./routers/products');
const cartRoutes = require('./routers/cart');
const orderRoutes = require('./routers/order');
const emailRoutes = require('./routers/email');
const historiesRoutes = require('./routers/histories');
const chatRoomRoutes = require('./routers/chatrooms');
const adminRoutes = require('./routers/admin');

const auth = require('./middleware/auth');
const { role } = require('./middleware/role');

const MONGODB_URI = 'mongodb+srv://nhat:F0zwwyPdfQ9lumQw@cluster0.gmbddls.mongodb.net/E-commerce?retryWrites=true'

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, `${uuidv4().png}`)
  }
});

const corsOptions = {
  origin: "https://jolly-kashata-7febbe.netlify.app",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: ["GET", "POST", "PUT", "DELETE"]
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: storage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/home',(req, res, next) => {
  res.send({message:'Hello'})
})

app.use('/users', authRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/email', emailRoutes);
app.use('/histories', historiesRoutes);
app.use('/chatrooms', chatRoomRoutes);
app.use('/admin', adminRoutes);

app.post('/add-product', (req, res, next) => {
  const image = req.body;
  const url = req.file.path.replace("\\", "/");
  console.log(url);
});

// const port = 5000;
const port = process.env.PORT;

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    // const server = app.listen(port);
    // const io = require('./socket').init(server);
    // io.on('connection', socket => {
    //   console.log('Listening to port ' + port);
    // })

    app.listen(port);
    console.log('Listening to port ' + port);
  })
  .catch(err => console.log(err));

  // package.json 
  // script 
  // "start-server": "node app.js"

module.exports = app;
