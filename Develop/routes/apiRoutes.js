// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information (the one we are targeting here is db.json).

const dbData = require('../db/db');
const fs = require ('fs');
const { v4: uuidv4 } = require('uuid');
// uuidv4();          // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'    this is the univesally unique id --> run it on each db entry


// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" notes page.
  // They are presented with the saved notes from the database (db).
  // ---------------------------------------------------------------------------
  
  // app.get('/api/db', (req, res) => {res.json(dbData)});   // ORIGINAL app.get
  app.get('/api/notes', (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(
          '<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>'
          );
      } else {
        console.log("we have read the file 'db'")
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    })
  });

  app.get('/api/notes/:title', (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {

  });
});


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know the note has been added to the left-hand column.
    // It will do this by using a console log after note is submitted.
    // req.body is available since we're using the body parsing middleware
      let newNote = req.body;
        dbData.push(newNote);
        console.log(dbData);
      let data = JSON.stringify(dbData);

      fs.writeFile(`${__dirname}/../db/db.json`, data, (err) => {
        if (err) throw err;
        
        res.json(true);
        console.log('dbData written to file');
    });
  });

    // TODO add update facility by passing in the unique id number such as below
    app.post('/api/notes/:id', (req, res) => {

    });

    app.delete('/api/notes/')

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    dbData.length = 0;

    res.json({ ok: true });
  });
};
