var express = require('express');
var router = express.Router();

require('../models/connection');
const Place= require('../models/places');


//NEW PLACE
router.post('/places', (req, res) => {
    // Check if the place does not already exist in data base
    Place.findOne({ name: req.body.name, nickname: req.body.nickname }).then(data => {
      if (data === null) {
        
        const newPlace = new Place({
          nickname: req.body.nickname,
          name: req.body.name,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        });
  
        newPlace.save().then(newDoc => {
          res.json({ result: true});
        });
      } else {
        // User already exists in database
        res.json({ result: false, error: 'Place already exists' });
      }
    });
  });




//GET: display all places by NICKNAME
router.get('/places/:nickname', (req, res) => {
    Place.find({nickname: req.params.nickname})
    .then(data => {
        res.json({ result: true, places: data })
    });
})


//DELETE: delete a place (user can only delete its own place)
router.delete('/places', (req, res) => {

    Place.deleteOne({ name: req.body.name, nickname: req.body.nickname})
        .then(deletedDoc => {
            if (deletedDoc.deletedCount > 0) {
            // Place successfully deleted
              res.json({ result: true });
            } else {
            res.json({ result: false, error: "Place not found" });
            }
        });
});



  


module.exports = router;
