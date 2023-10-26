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
const REFRESH_TOKEN = "1//04msO8HSV3P5DCgYIARAAGAQSNwF-L9IrznHDq1Df_D4qG4Pp4K7hL43wR86RSkgJS5uLPcQ2cyLWu7QSTK2vV6HILZQtkn-r8s0"

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
//--------------------------------------------------------------

const userSchema = {
  email: String,
  emailId: String,
  password: String
}


const noteSchema = {
  user: String,
  index: Number,
  book: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema); //singular version of the collection
const User = mongoose.model("User", userSchema); //singular version of the collection
//------------------------------------------------------------------



//------------------------------------------
//collect username and filter notes accordingly
let userName = "me";
let passWord;
let numberOfPosts;
let found_note = new Note();
//get function stuff--------------------

let titleofBook,authorofBook;
app.get("/", function(req,res){
res.redirect("login");
});

app.get("/home", function(req,res){
///////////////////////////////////////////




////////////////////////////

Note.countDocuments({user: userName}, function(err, count)
{

  if(count===0){
    const note1 = new Note({
      user: userName,
      index: 1,
      book: "Think Again",
      content: "Freeze and seize"
    });

    note1.save();

    const note2 = new Note({
      user: userName,
      index: 2,
      book: "Psychology of Money",
      content: "Nothing is as good or bad as it seems - NYU prof. Scott Galloway"
    });

    note2.save();

    const note3 = new Note({
      user: userName,
      index: 3,
      book: "Mindset",
      content: "In one world, effort is a bad thing. It, like failure, means you’re not smart or talented. If you were, you wouldn’t need effort. In the other world, effort is what makes you smart or talented."
    });

    note3.save();

    count = 3;
  }

  const pipeline = [
      { $match: {user:userName} },
      { $sample: { size: 1 } },
    ];

Note.aggregate(pipeline, function(err, foundNote)
     {
      console.log("this is the found note: ");
      console.log(foundNote);
      found_note = foundNote[0];
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
                from: 'QuoteVault <srivastava.snigdha519@gmail.com>',
                to: ['srivastava.snigdha519@gmail.com'],
                subject: 'Quote of the day!',
                text: 'Hello from the other side',
                html: '<div style="background-color: #95D1CC;text-align: center;padding: 1em; border-radius: 25% 10%; font: Roboto;">'+'<h2>'+foundNote[0].book+'</h2><h3 style="font-style: italic;">'+foundNote[0].content+'</h3></div>'
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




/////////////////////////////////

      res.render('home', {
        book: found_note.book,
        content: found_note.content,
        user: userName
      });
});//get

  /////////////////////////////




app.get("/display", function(req,res){
  Note.find({user: userName}, function(err, foundPosts){
    if(!err){
      res.render("display", {newPost: foundPosts});
    }
  });
});


app.get("/compose", function(req,res){
  res.render("compose")
});

//for new users
app.get("/register", function(req,res){
  res.render("register")
});

//for existing users
app.get("/login", function(req,res){
  res.render("login")
});

app.get("/loginError", function(req,res){
  res.render("loginError")
});



app.post("/login", function(req,res){

userName = req.body.emailInput;
password = req.body.passwordInput;

User.findOne({email: userName}, function(err, foundUser){

if(err){
  console.log("error at finding user"+err);
}
else{
  if(foundUser){
    if(foundUser.password === password){
      console.log("PASSWORD MATCHED")
      res.redirect("/home");
    }
    else{
      console.log("INCORRECT PASSWORD")
      res.redirect("loginError");
    }
  }
  else{ //incorrect email
    res.redirect("loginError");
  }
}


});


});


app.post("/register", function(req,res){

  const newUser = new User({
    email: req.body.emailInput,
    password: req.body.passwordInput,
    emailId: req.body.emailIdInput
  });

userName = req.body.emailInput;
  newUser.save(function(err){

    if(err){
      console.log("error in register")
    }
    else{

      //initialize new collection



        res.redirect("/");
    }
  })


});

app.post("/home", function(req,res)
{

  const newNote = new Note(
    {
      user: userName,
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
