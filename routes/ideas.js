const router = require('express').Router();
const Idea = require('../models/Idea');

//Get All Ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({
      success: true,
      data: ideas,
    });
    console.log(ideas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: error.message });
  }
});
//Get Idea by ID
router.get('/:id', async (req, res) => {
  try {
    const ideas = await Idea.findById(req.params.id);
    res.json({
      success: true,
      data: ideas,
    });
  } catch (error) {
    if (!ideas) {
      return res.status(404).json({ msg: ' Resource Not Found' });
    }
    res.status(500).json({ success: false, msg: error.message });
  }
});

//Add and Idea

router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: error.message });
  }
});

//Update Idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    console.log(idea.username, req.body.username);
    if (idea.username === req.body.username) {
      const Updatedidea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text || text,
            tag: req.body.tag || tag,
          },
        },
        {
          new: true,
        }
      );
      return res.json({ success: true, data: Updatedidea });
    }
    res.status(403).json({
      success: false,
      msg: 'You are not Authorized to do this update',
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//Delete Idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);

      return res.json({ success: true, data: {} });
    }
    res.status(403).json({
      success: false,
      msg: 'You Are not Authorized to Delete this resource',
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = router;
