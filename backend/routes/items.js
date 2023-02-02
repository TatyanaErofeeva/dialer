const express = require('express');
const router = express.Router();
const data = [
    {
        id:1,
        region: 'Нижний Новгород',
        provider: 'Ростелеком',
        phoneNumber: '8(831)268-10-00',
        line: '711-CC_NN',
        prefix: '011',  
    },
    {
        id:2,
        region: 'Тверь',
        provider: 'Эртелеком',
        phoneNumber: '8(8332)26-10-00',
        line: '710-CC_KIR',
        prefix: '011',  
    },
    {
        id:3,
        region: 'Москва',
        provider: 'МТС',
        phoneNumber: '8(910)263-10-15',
        line: '710-CC_KK',
        prefix: '011',  
    },
    {
        id:4,
        region: 'Киров',
        provider: 'Билайн',
        phoneNumber: '8(903)241-12-25',
        line: '710-CC_PP',
        prefix: '011',
    },
];

router.get('/', function (req, res) {
    res.status(200).json(data);
  });
  
  router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      res.status(200).json(found);
    } else {
      res.sendStatus(404);
    }
  });
  
  router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    //let orderNums = data.map(item => item.order);
  
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    //let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
  
    let newItem = {
      id: newId,
      region: req.body.region,
      provider: req.body.provider,
      phoneNumber: req.body.phoneNumber,
      line: req.body.line,
      prefix: req.body.prefix,
    };
  
    data.push(newItem);
  
    res.status(201).json(newItem);
  });
  
  router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
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
  
      let targetIndex = data.indexOf(found);
  
      data.splice(targetIndex, 1, updated);
  
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
  
  router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
      return item.id === parseInt(req.params.id);
    });
  
    if (found) {
      let targetIndex = data.indexOf(found);
  
      data.splice(targetIndex, 1);
    }
  
    res.sendStatus(204);
  });
  
  module.exports = router;