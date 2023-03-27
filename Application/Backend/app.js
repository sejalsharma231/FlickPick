const http = require('http');
const port = 8000;

const express = require("express");
const cors = require('cors');
var mysql = require("mysql");
const app = express();
const parse = require("body-parser");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"]
  }
});

const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');


app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/movies', moviesRouter);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('updateWatchlist', ({ action, data }) => {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'CS348Project',
      database: 'Project'
    });

    connection.connect(function (err) {
      if (err) throw err

    });
    const {
      userID,
      mid,
    } = data;


    if (action === 'add') {
      // add validators to check that everything is a string            
      const queryString = `INSERT into watchlist (userID,Movie_ID) VALUES (${userID}, ${mid})`;
      connection.query(queryString, (error) => {
        if (error) {
          //   res.status(400).send('Database could not delete from watchlist');
          console.log(error)
        } else {
          const queryString = `SELECT * from (SELECT Movie_ID, count(*) FROM watchlist GROUP BY Movie_ID ORDER BY count(*) desc) as a join movies on a.Movie_ID = movies.Movie_ID LIMIT 20`;
          connection.query(queryString, (error, results) => {
            if (error) {
              //   res.status(400).send('Could not update trending movies');
              console.log(error)
            } else {
              console.log('updated')
              socket.broadcast.emit('updated', results)
            }
          });
        }
      });
    } else if (action === 'remove') {
      const queryString = `DELETE from watchlist WHERE userID = ${userID} and Movie_ID = ${mid}`;
      connection.query(queryString, (error) => {
        if (error) {
          //   res.status(400).send('Database could not delete from watchlist');
          console.log(error)
        } else {
          const queryString = `SELECT * from (SELECT Movie_ID, count(*) FROM watchlist GROUP BY Movie_ID ORDER BY count(*) desc) as a join movies on a.Movie_ID = movies.Movie_ID LIMIT 20`;
          connection.query(queryString, (error, results) => {
            if (error) {
              //   res.status(400).send('Could not update trending movies');
              console.log(error)
            } else {
              console.log('updated')
              socket.broadcast.emit('updated', results)
            }
          });
        }
      });
    }
    socket.on('disconnect', () => socket.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
});

  server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
