const express = require('express');
const fs = require('fs');
const router = express.Router();
const DialerStatus = {
UKNOWN: 'uknown',
QUEUED:'queued', 
SUCCESS :'success',
FAILURE: 'failure'
};

let numberStatus = '';

router.get('/', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const dialerStatus = fs.readFileSync('dialerStatus.json');
  const infoStatus = JSON.parse(dialerStatus);
  const feedback = infoStatus.result.report.slice(1);
  let newObj={};

  feedback.forEach((item) => {
    const phoneNumber = item[0];
    const finished = item[3]; 
    const triesSuccess = item[4];
    const triesFailure = item[5];
    
  const getStatus = function(finished,triesSuccess,triesFailure) {
    if(finished && triesSuccess == 1 && triesFailure == 0) {
      return numberStatus = DialerStatus.SUCCESS
    }
      if(finished && triesSuccess == 0 && triesFailure == 1) {
        return numberStatus = DialerStatus.FAILURE
      }
        if (!finished){
          return numberStatus = DialerStatus.QUEUED
        }
  }
  newObj[phoneNumber] = getStatus(finished,triesSuccess,triesFailure); 
  })
  
  info.forEach((elem) => {
    if(newObj[elem.phoneNumber]){
      elem.dialerStatus = newObj[elem.phoneNumber];
    }
    else{
      elem.dialerStatus = DialerStatus.UKNOWN
    }
  })
  res.status(200).json(info); 
  });
  
router.get('/id/:id', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});
  
router.post('/', function (req, res) {
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const itemIds = info.map(item => item.id);
  const newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  const newItem = {
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
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  if (found) {
    const updated = {
      id: found.id,
      region: req.body.region,
      provider: req.body.provider,
      phoneNumber: req.body.phoneNumber,
      line: req.body.line,
      prefix: req.body.prefix,
    };

    const targetIndex = info.indexOf(found);
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
  const data = fs.readFileSync('data.json');
  const info = JSON.parse(data);
  const found = info.find(function (item) {
    return item.id === parseInt(req.params.id);
  });
  
  if (found) {
    const targetIndex = info.indexOf(found);

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

/////////////////////////////// Send and get info from the autodialer
router.get('/get/campaignstatus', function (req, res) {
  const data = fs.readFileSync('campaignStatus.json');
  const infoStatus = JSON.parse(data);
  let campaignStatus = infoStatus.result.status.status;
console.log(campaignStatus);
res.status(200).json(campaignStatus);
});


router.post('/campaignstatus', function (req, res) {
  const newItem = {
    campaignStatus: req.body.campaignStatus,
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(newItem) 
  });

  res.status(201).json(newItem);
});


module.exports = router;