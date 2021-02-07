// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const dbData = require('../db/db');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" notes page.
  // They are presented with the saved notes from the database (db).
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the db)
  // ---------------------------------------------------------------------------

  // app.get('/api/db', (req, res) => {res.json(dbData)});   ORIGINAL app.get
  app.get('/api/db', (req, res) => {res.json(dbData)});


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/db', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know the note has been added to the left-hand column.
    // It will do this by using a console log after note is submitted.
    // req.body is available since we're using the body parsing middleware
    dbData.push(req.body);
    res.json(true);
    console.log("note has been saved to the database");
  });

    // TODO add update facility by passing in the unique id number such as below
    app.post('/api/db/:id', (req, res) => {

    });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    dbData.length = 0;

    res.json({ ok: true });
  });
};
