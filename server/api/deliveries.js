const router = require('express').Router();
const fs = require('fs');
module.exports = router;

let deliveryFeatures;
fs.readFile(
  '/Users/annahippee/Post-Bootcamp/CityPlanning/server/deliveries.json',
  'utf8',
  (err, response) => {
    if (err) {
      console.error(err);
    } else {
      const data = JSON.parse(response);
      deliveryFeatures = data;
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    console.log(deliveryFeatures['features']);
    res.json(deliveryFeatures['features']);
  } catch (error) {
    console.error('error in GET /deliveries', error);
    next(error);
  }
});


router.put('/:id', async (req, res, next) => {
  try {

    // I'm more used to working with databases here, so apologies if there's a much easier way to do this!
    
    // save index of item in array
    let index;
    // return item we want to modify based on the id
    let deliveryToBeUpdated = deliveryFeatures['features'].filter(
      (feature, i) => {
        if (feature['properties']['id'] === req.params.id) {
          index = i;
        }
        return feature['properties']['id'] === req.params.id;
      }
    );
    //if req.body includes notes, update the notes property
    if (req.body.notes) {
      deliveryToBeUpdated[0]['properties']['notes'] = req.body.notes;
    }
    //if req.body includes delivered, update the delivered field to true (or false for testing)
    if (req.body.delivered) {
      deliveryToBeUpdated[0]['properties']['delivered'] = req.body.delivered;
    }
    //create a copy of the delivery features object ---> replace the delivery object with the updated one
    let updatedFeatures = { ...deliveryFeatures};
    updatedFeatures['features'][index] = deliveryToBeUpdated;

    //stringify so we can write to the file
    let deliveriesJSON = JSON.stringify(updatedFeatures);
    fs.writeFileSync(
      '/Users/annahippee/Post-Bootcamp/CityPlanning/server/deliveries.json',
      deliveriesJSON,
      'utf-8'
    );
    //send back the updated file -- will fix later
    res.json(updatedFeatures["features"]);
  } catch (error) {
    console.error('error in PUT', error);
    next(error);
  }
});
