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
  content: String
};

const Note = mongoose.model("Note", noteSchema); //singular version of the collection
const User = mongoose.model("User", userSchema); //singular version of the collection

app.use(cors());
app.use(express.json());
let userName;
let foundNote;

app.get('/login', (req, res) => {
    res.json({ message: "Hello from server!" },
);
});

// app.get('/home', (req, res) => {
//   const pipeline = [
//       { $match: {user:userName} },
//       { $sample: { size: 1 } },
//     ];
//
//
// Note.aggregate(pipeline, function(err, foundNote)
//      {
//       res.json(foundNode);
//      });
//
// });

app.get('/Collection', (req, res) => {

  Note.find({user: userName}, function(err, list){

    res.json(list);
    console.log(list);
  });

});

app.post('/sendComposeData', async(req, res) => {
console.log("Reached here")
  const newNote = new Note(
    {
      user: userName,
      book: req.body.title,
      content: req.body.description
    } );
    console.log(newNote);
  newNote.save();

});
app.post('/sendLoginData', async(req, res) => {

userName = req.body.email;
password = req.body.password;

  User.findOne({email: userName}, function(err, foundUser){

  if(err){
    console.log("error at finding user"+err);
  }
  else{
    if(foundUser){
      if(foundUser.password === password){
        console.log("PASSWORD MATCHED")
      app.get('/home');
      }
      else{
        console.log("INCORRECT PASSWORD")
    //    res.redirect("loginError");
      }
    }
    else{ //incorrect email
    //  res.redirect("loginError");
    }
  }

  });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
