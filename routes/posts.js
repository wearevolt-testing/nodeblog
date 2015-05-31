import express  from 'express'
import mongoose from 'mongoose'

const router = express.Router()

router.param('id', (req, res, next, id) => {
  //console.log('validating ' + id + ' exists');
  //find the ID in the Database
  mongoose.model('Post').findById(id, (err, post) => {
    //if it isn't found, we are going to repond with 404
    if (err) {
      console.log(`${id} was not found`)

      res.status(404)
      var err = new Error('Not Found')
      err.status = 404
      res.format({
        html() { next(err) },
        json() { res.json({ message: `${err.status} ${err}` }) }
      });

    } else {
      //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
      //console.log(post);
      // once validation is done save the new item in the req
      req.id = id
      // go to the next thing
      next()
    } 
  })
})

router.get('/:id', (req, res) => {
    mongoose.model('Post').findById(req.id, (err, post) => {
      if (err) {
        console.log(`GET Error: There was a problem retrieving: ${err}`);
      } else {
        console.log(`GET Retrieving ID: ${post._id}`);

        res.render('post', {
          post,
          path: req.path
        })
      }
    })
  }) 


export default router
