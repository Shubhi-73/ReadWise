const express = require('express');
const cors = require('cors');
const app = express();

/////database connection///
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ReadwiseDB", {
  useNewUrlParser: true
});

const userSchema = {
  email: String,
  emailId: String,
  password: String
}

const noteSchema = {
  user: String,
  book: String,
  content: String,
  tag: String
};

const dailyQuoteSchema = {
  user: String,
  date: String,
  book: String,
  content: String,
  tag: String
};

const Quote = mongoose.model("Quote", dailyQuoteSchema); //singular version of the collection
const Note = mongoose.model("Note", noteSchema); //singular version of the collection
const User = mongoose.model("User", userSchema); //singular version of the collection

app.use(cors());
app.use(express.json());
let userName;
let foundNote;
let todayQuote;
let list;
let tags;

app.get('/', (req, res) => {
    res.json({ message: userName},
);
});

app.get('/home', (req, res) => {

  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate); // "2022-06-17"
console.log(userName);
Quote.find({user: userName, date: currentDate}, function(err, todayQuote){ //find the mailID of the user
  if (err) {
      console.error(err);
    } else {
      console.log('Quotes for today:', todayQuote);
    }

  res.json(todayQuote[0]);
});

});

// app.get('/allHighlights'+ tag, (req, res) => {
// //retrieves tag from collection
//   Note.find({user: userName, tag: tag}, function(err, list){
//     res.json(list);
//     console.log(list);
//   });
// });

app.get('/Collection', (req, res) => {
  Note.find({user: userName,}, function(err, list){
    res.json(list);
    console.log(list);
  });
  //redirecting to the allHighlights page
});


app.post('/sendComposeData', async(req, res) => {
console.log("Reached here")
  const newNote = new Note(
    {
      user: userName,
      book: req.body.title,
      content: req.body.description,
      tag: req.body.tag
    } );
    console.log(newNote);
  newNote.save();

});
app.post('/sendLoginData', async(req, res) => {

userName = req.body.username;
password = req.body.password;

  User.findOne({email: userName}, function(err, foundUser){

  if(err){
    console.log("error at finding user"+err);
  }
  else{
    if(foundUser){
      if(foundUser.password === password){
        console.log("PASSWORD MATCHED")
        res.redirect("http://localhost:8000/home");
      }
      else{
        console.log("INCORRECT PASSWORD");
    //    res.redirect("loginError");
      }
    }
    else{ //incorrect email
    //  res.redirect("loginError");
    }
  }

  });
});

app.post('/sendSignUpData', async(req, res) => {

const newUser = new User(
  {
    email: req.body.username,
    emailId: req.body.email,
    password: req.body.password
  } );

  console.log(newUser);
newUser.save();


});




app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
