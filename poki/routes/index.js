var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

ips = [
      {red: 0,
        green: 226,
        blue: 0,
        opacity: 1,
        last: 255},
      {red: 0,
        green: 226,
        blue: 226,
        opacity: 1.0,
        last: 255},
        {red: 127,
        green: 0,
        blue: 0,
        opacity: 1/255,
        last: 1}]

ipSet = new Set()

router.get('/pokemon', function(req, res) {
  var cur = {red: 0, green: 0, blue: 0, opacity: 1, last: 0};
  try {
    var s = req.ip;
    s = s.split(':');
    s = s[s.length-1];
    s = s.split('.');
    cur['red'] = Number(s[0]);
    cur['green'] = Number(s[1]);
    cur['blue'] = Number(s[2]);
    cur['opacity'] = Number(s[3]/255);
    cur['last'] = Number(s[3]);
  } 
  catch(e) {
    console.log(e);
  }

  if(!ipSet.has(req.ip)){
    ips.push(cur);
    ipSet.add(req.ip);
  }

  cur = JSON.parse(JSON.stringify(cur));
  cur['message'] = 'This is your IP';
  res.send(ips.concat([cur]));
});

router.post('/pokemon', function(req, res) {
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
