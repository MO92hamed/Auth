const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/', verify , (req, res) => {
   // res.json({
       // posts: {
         //   title: 'first post',
          //  description: 'random data rou shouldnt access'
       // }
   // })
    res.send(req.user)
    //User.findByOne({_id: req.user})
})

module.exports = router;