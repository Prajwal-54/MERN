const express = require("express");
// const http = require("http");
const fs = require("fs");
const path = require("path");
// const PORT = process.env.PORT || 5000;

// const server = http.createServer((req, res) => {
//   // if (req.url === "/") {
//   //   fs.readFile(path.join(__dirname, "public", "home.html"), (err, data) => {
//   //     if (err) throw err;

//   //     res.writeHead(200, { "Content-Type": "text/html" });
//   //     res.end(data,'utf8');
//   //   });
//   // }

//   //  if (req.url === "/about") {
//   //    fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
//   //     if (err) throw err;

//   //     res.writeHead(200, { "Content-Type": "text/html" });
//   //     res.end(data);
//   //   });
//   // }

//   let filePath = path.join(
//     __dirname,
//     "public",
//     req.url === "/" ? "home.html" : req.url
//   );

//   let ext = path.extname(filePath);
//   let contentType = "text/html";

//   switch (ext) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".jpeg":
//       contentType = "image/jpeg";
//       break;
//   }

//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         //page not found
//         fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
//           res.writeHead(200, { "Content-Type": contentType });
//           res.end(data, "utf8");
//         });
//       } else {
//         // server error
//         res.writeHead(500);
//         res.end(`server error ${err.code}`);
//       }
//     } else {
//       //success
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf8");
//     }
//   });

// });

// server.listen(PORT, () =>
//   console.log(`server running on PORT ${PORT} .... hello there`)
// );

//express tutorial
const PORT = process.env.PORT || 5000;
const app = express();
//middleWare
const logger = require("./middleWare/logger");
//route
const route = require("./route/api/member");
const expHandlBars= require('express-handlebars')
const members = require('./Members')

// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname,'public','home.html'))
// })


//init middleWare
// app.use(logger);

//init body parser middleWare 
app.use(express.json())
//middleWare for form submission
app.use(express.urlencoded({extended:false}))

// set static folder
// app.use(express.static(path.join(__dirname, "public")));


app.get('/',(req,res)=>{
  res.render('index',{title:'member app',members})
})


//handlebar middleware : it is for rendering template 
app.engine('handlebars', expHandlBars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');


//using route
app.use('/api/users',require('./route/api/member'))

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
