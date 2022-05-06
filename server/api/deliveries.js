const router = require('express').Router();
// importing the JSON file directly
const deliveries = require('../deliveries.json');
const fs = require('fs');
module.exports = router;

let deliveryFeatures;
fs.readFile('/Users/annahippee/Post-Bootcamp/CityPlanning/server/deliveries.json', 'utf8', (err, response) => {
    if (err) {
        console.error(err);
    } else {
        const data = JSON.parse(response);
        deliveryFeatures = data;
    }
}) 

router.get('/', async (req, res, next) => {
  try {
    console.log(deliveryFeatures["features"])
    res.json(deliveryFeatures["features"]);
  } catch (error) {
    console.error('error in GET /deliveries', error);
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
})