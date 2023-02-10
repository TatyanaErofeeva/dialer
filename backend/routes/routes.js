const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', function (req, res) {
  let data = fs.readFileSync('data.json');
  let info = JSON.parse(data);
  res.status(200).json(info); 
  });
  
  router.get('/:id', function (req, res) {
    let data = fs.readFileSync('data.json');
    let info = JSON.parse(data);
    let found = info.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });
  
  router.post('/', function (req, res) {
    let data = fs.readFileSync('data.json');
    let info = JSON.parse(data);
    let itemIds = info.map(item => item.id);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    let newItem = {
      id: newId,
      region: req.body.region,
      provider: req.body.provider,
      phoneNumber: req.body.phoneNumber,
      line: req.body.line,
      prefix: req.body.prefix,
    };

    info.push(newItem);

    fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
        res.status(404).statusMessage = 'Ошибка при записи файла';
          return ;
      }
      console.log("The file was saved!");
    });
  
    res.status(201).json(newItem);
  });
  
  router.put('/:id', function (req, res) {
    let data = fs.readFileSync('data.json');
    let info = JSON.parse(data);
    let found = info.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
    if (found) {
      let updated = {
        id: found.id,
        region: req.body.region,
        provider: req.body.provider,
        phoneNumber: req.body.phoneNumber,
        line: req.body.line,
        prefix: req.body.prefix,
      };
  
      let targetIndex = info.indexOf(found);
      info.splice(targetIndex, 1, updated);

      fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
        if (err) {
          console.log(err);
          res.status(404).statusMessage = 'Ошибка при записи файла';
            return ;
        }
        console.log("The file was saved!");
      });
      res.status(200).json(updated);
    } 
  });
  
  router.delete('/:id', function (req, res) {
    let data = fs.readFileSync('data.json');
    let info = JSON.parse(data);
    let found = info.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
   
    if (found) {
      let targetIndex = info.indexOf(found);
  
      info.splice(targetIndex, 1);
    }
    
    fs.writeFileSync('data.json', JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
        res.status(404).statusMessage = 'Ошибка при записи файла';
          return ;
      }
      console.log("The file was saved!");
    });
  
    res.sendStatus(204);
  });
  
///////////////////////////////
router.post('/', function (req, res) {

  let newItem = {
    campaignStatus: req.body.status,
  };

  fs.writeFileSync('campaignStatus.json', JSON.stringify(newItem), function (err) {
    if (err) {
      console.log(err);
      res.status(404).statusMessage = 'Ошибка при записи файла';
        return ;
    }
    console.log("The file was saved!");
  });

  res.status(201).json(newItem);
});


  module.exports = router;