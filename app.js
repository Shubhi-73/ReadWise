const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer")
const {google} = require("googleapis")
const JSONStream = require('JSONStream');

//------------------------for NYtimes API------------
const https = require("https");

//----------------google api----------
const CLIENT_ID = "226419603487-b7cp7tgrffkiqbv1i288m2sge8666qt9.apps.googleusercontent.com"
const CLIENT_SECRET= "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04yc920z6G777CgYIARAAGAQSNwF-L9IryqYvU1KLFe9pPJJ2OsmLyVxjQJ8WJ9w6ueFV1auh_s3Zx7sy-vObv_9RppUOWsgB5xE"

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    //--------------google api end---------------
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//------------------------------------------------------------- mongoose stuff

mongoose.connect("mongodb://localhost:27017/ReadwiseDB", {
  useNewUrlParser: true
});
const noteSchema = {
  index: Number,
  book: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema); //singular version of the collection

//------------------------------------------------------------------

// const note1 = new Note({
//   index: 1,
//   book: "Think Again",
//   content: "One of my biggest pet peeves is feigned knowledge, where people pretend to know things they don’t. It bothers me so much that at this very moment I’m writing an entire book about it. - Adam Grant"
// });
//
// note1.save();
//
// const note2 = new Note({
//   index: 2,
//   book: "Psychology of Money",
//   content: "Nothing is as good or bad as it seems - NYU prof. Scott Galloway"
// });
//
// note2.save();
//
// const note3 = new Note({
//   index: 3,
//   book: "Mindset",
//   content: "In one world, effort is a bad thing. It, like failure, means you’re not smart or talented. If you were, you wouldn’t need effort. In the other world, effort is what makes you smart or talented."
// });
//
// note3.save();

//------------------------------------------

let numberOfPosts;
let found_note = new Note();
//get function stuff--------------------
Note.estimatedDocumentCount({}, function(err, count)
{
  if(err) console.log(err);  //count contains the right value
  numberOfPosts = count;
  console.log("reached 2");
  console.log(numberOfPosts);

  console.log("reached 1");

  var randomNumber1 = Math.floor(Math.random() * numberOfPosts + 1);

  console.log("randomNumber1");
  console.log(randomNumber1);
  Note.findOne(
  {
      index: randomNumber1
  }, function(err, foundNote)
     {
      console.log("this is the found note: ");
      console.log(foundNote);
      found_note = foundNote;
      if (!err)
      {
        //where home render was here
        //sending a mail through API
        async function sendMail()
        {
          try
          {
              const accessToken = await oAuth2Client.getAccessToken();

              const transport = nodemailer.createTransport(
              {
                  service: 'gmail',
                  auth:
                  {
                      type: 'OAuth2',
                      user: 'srivastava.snigdha519@gmail.com',
                      clientId: CLIENT_ID,
                      clientSecret: CLIENT_SECRET,
                      refreshToken: REFRESH_TOKEN,
                      accessToken: accessToken,
                  },
              });

              const mailOptions =
              {
                from: 'Readwise <srivastava.snigdha519@gmail.com>',
                to: ['srivastava.snigdha519@gmail.com',],
                subject: 'Quote of the day!',
                text: 'Hello from the other side',
                html: '<div style="background-color: #95D1CC;text-align: center;padding: 1em; border-radius: 25% 10%; font: Roboto;">'+'<h2>'+foundNote.book+'</h2><h3 style="font-style: italic;">'+foundNote.content+'</h3></div>'
              }

              const result = await transport.sendMail(mailOptions);
              return result;
          } catch (error)
          {
            return error;
          }
        }

        sendMail()
        .then((result) => console.log('Email sent...', result))
        .catch((error) => console.log(error.message));

      }
  });
});

let titleofBook,authorofBook;
app.get("/", function(req,res){

////////////////////////////
const url = "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=G4Pv9oLvPPgv6LF6u8ZlBT7EaQfIQTax#";
https.get(url, function(response) {
  console.log(response.statusCode);
  if(response.statusCode === 404) res.send(error);
  else{
    let accumulatedData = ''; // Accumulate the received data

    response.on("data", function(chunk) {
      accumulatedData += chunk;
    });

    response.on("end", function() {
    try {
      const bookData = JSON.parse(accumulatedData);
      console.log("THIS IS BOOKDATA", bookData);

      const titleofBook = bookData.results.lists[1].books[0].title; // Target specific data
      const authorofBook = bookData.results.lists[1].books[0].author;
      const descriptionofBook = bookData.results.lists[1].books[0].description;
      const weeksOnlistofBook = bookData.results.lists[1].books[0].weeks_on_list;
      const bookImageofBook = bookData.results.lists[1].books[0].book_image;

      res.render('home', {
        book: found_note.book,
        content: found_note.content,
        title: titleofBook,
        author: authorofBook,
        description: descriptionofBook,
        weeks: weeksOnlistofBook,
        image: bookImageofBook,
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the parsing error as needed
    }


});//response
}//else
});//http request
});//get

  /////////////////////////////




app.get("/display", function(req,res){
  Note.find({}, function(err, foundPosts){
    if(!err){
      res.render("display", {newPost: foundPosts});
    }
  });
});


app.get("/compose", function(req,res){
  res.render("compose")
});

app.post("/", function(req,res)
{

  const newNote = new Note(
    {
      index: numberOfPosts + 1,
      book: req.body.title,
      content: req.body.highlight
    } );
    console.log(newNote);
  numberOfPosts = numberOfPosts + 1;
  newNote.save();
  res.redirect("/display");
});

console.log("the end")
app.listen(3000, function()
{
  console.log("Server started on port 3000");
});
