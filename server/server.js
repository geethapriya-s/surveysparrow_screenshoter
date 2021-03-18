const http = require('http');
const request = require('request');
const fs = require('fs');
const express = require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(cors())
app.use(bodyParser.json());

app.use(express.static('./Capture'));

var port = process.env.PORT || 8000

// app.post('/capture',function(req,res){
//     console.log(req.body.url+" "+req.body.format+" "+req.body.range);
//     var urls="https://api.apiflash.com/v1/urltoimage?access_key=5fac48fd2dab498e8ab2f3c794a37945"+"&format="+req.body.format+"&quality="+req.body.range+"&scroll_page=true"+"&url="+req.body.url;
//     console.log(urls);
//     app.use(express.static('./display'));
//     fs.writeFile(`./shots/screenshot.jpeg`, body, "binary", error => {
//     });
//     //  res.sendFile(__dirname + '/display.html'); 
//     // request({
// //     url: "https://api.apiflash.com/v1/urltoimage",
// //     encoding: "binary",
// //     qs: {
// //         access_key: "5fac48fd2dab498e8ab2f3c794a37945",
// //         url: "https://api.apiflash.com/v1/urltoimage?access_key=5fac48fd2dab498e8ab2f3c794a37945&format=png&quality=100&scroll_page=true&url=https%3A%2F%2Fwww.google.com%2F"
// //     }
// // }, (error, response, body) => {
// //     if (error) {
// //         console.log(error);
// //     } else {
// //         fs.writeFile("screenshot.jpeg", body, "binary", error => {
// //             console.log(error);
// //         });
// //     }
// // });
   
// })
app.get('/download/:file',(req,res) => {
  console.log(req.params.file)
  const filePath = `${__dirname}/Capture/${req.params.file}`;
  const type = req.params.file.split(".").slice(-1)[0];
  const fileName = `capture.${type}`; 
  res.download(filePath, fileName);  
});

app.post('/capture',(req,res) => {

  console.log(req.body)
  var date=new Date();
  const fileName  =  date.toISOString()+ "." +req.body.format; 
  
  request({
      url: "https://api.apiflash.com/v1/urltoimage",
      encoding: "binary",
      qs: {
          access_key: "5fac48fd2dab498e8ab2f3c794a37945",
          url: req.body.url,
          range: req.body.range,
          format: req.body.format,
          full_page : true
      }
  }, (error, response, body) => {
    console.log(response)
      if (error) {
          console.log(error);
      } else {
          fs.writeFile(`${__dirname}/Capture/${fileName}`, body, "binary", error => {
          });

        const image = {
            fileName: fileName
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(image);
      }

      console.log(fileName);
  });
});

app.get('*' ,(req,res) => {
  res.statusCode = 400;
  res.end("Bad Request path");
});

app.listen(port, function() {
  console.log("App is running on port " + port);
});