
//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var path= require("path");

//web root
server.use(express.static(__dirname+"/myserver"));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

var fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 

/*ProfolioDB.insert([
     { modal: "#card1", imgSrc: "assetss/第22組 Broqué.jpg"},
    { modal: "#card2", imgSrc: "assetss/YOOOOLLO.jpg"},
    { modal: "#card3", imgSrc: "assetss/HOUSE PPS.png"},
 ])
*/


/*server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});*/

server.get("/myserver", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.redirect("/#contact");
})

server.listen(7070, ()=>{
    console.log("Server is running at port 7070.");
})

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });