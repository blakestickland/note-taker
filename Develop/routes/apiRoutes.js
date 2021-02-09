// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information (the one we are targeting here is db.json).

const dbData = require("../db/db");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" notes page.
  // They are presented with the saved notes from the database (db).
  // ---------------------------------------------------------------------------

  // app.get('/api/db', (req, res) => {res.json(dbData)});   // ORIGINAL app.get
  app.get("/api/notes", (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(
          "<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>"
        );
      } else {
        console.log("we have read the file 'db'");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  });

  // Below code handles when an individual note is clicked in the left-hand column and becomes the active note in right-hand column.
  app.get("/api/notes/:title", (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {});
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know the note has been added to the left-hand column.
    // req.body is available since we're using the body parsing middleware
    let newNote = req.body;
    let newId = uuidv4();
    newNote.id = newId;
    dbData.push(newNote);
    console.log(dbData);
    let data = JSON.stringify(dbData);

    fs.writeFile(`${__dirname}/../db/db.json`, data, (err) => {
      if (err) throw err;

      res.json(true);
    });
  });

  // API DELETE Requests
  // Below code handles when a user clicks on a trashcan (ie. delete icon) associated with an individual note in the left-hand column.
  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(`${__dirname}/../db/db.json`, async (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(
          "<html><head><title>Oops</title></head><body><h1>Oops, there was an error</h1></html>"
        );
      } else {
        let clickedID = req.params.id;
        // get index of note (ie. object insdie the array) to remove.
        var remainingNote = JSON.parse(data).filter(function (item) {
          return item.id !== clickedID;
        });
        fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(remainingNote), (err) => {
          if (err) throw err;

          res.json(true);
        });
      }
    });
  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", (req, res) => {
  //   // Empty out the arrays of data
  //   dbData.length = 0;

  //   res.json({ ok: true });
  // });
};
