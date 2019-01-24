var dns = require('dns');
var url = require('url');
var urlEntries = require('../models/urlEntries.js');

var random_generate = () => {
  let code = "", picks = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
  let length = Math.floor(Math.random() * 5 ) + 4;
  for(var i=0;i<length;i++){
    code += picks.charAt(Math.floor(Math.random() * picks.length));
  }
  console.log(code);
  return code;
}

exports.addUrl = (req,res)=>{
  var original_url = req.body.url;console.log(original_url);
  var parsed_url = url.parse(original_url);console.log(parsed_url.hostname);
  

  if(parsed_url.hostname){
    dns.lookup(parsed_url.hostname,(err,address,family)=>{
      if(err) return res.json({"error":"invalid URL"});
      urlEntries.find({original_url:original_url},(err,data)=>{
        if(err) return res.json({"error":"invalid URL"});console.log(data);
        if(data.length === 0){
          var code = random_generate();
          var entry = new urlEntries({original_url: original_url, short_url: code});
          entry.save((err,data)=>{console.log(err,data)});
          return res.json({original_url: original_url, short_url: code});
        }
        return res.json({original_url: data[0].original_url, short_url: data[0].short_url});
      })
    })
  }
  else return res.json({"error":"invalid URL"})
}

exports.redirectUrl = (req,res) => {
  let short_url = req.params.shortUrl
  urlEntries.find({short_url: short_url},(err,data)=>{
    if(err) return res.json({"error":"invalid URL"});
    if(data.length === 0) return res.json({"error":"invalid URL"});
    res.redirect(data[0].original_url);
  })
}