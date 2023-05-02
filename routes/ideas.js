const router = require('express').Router();
const Idea = require('../models/Idea');

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];
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
    res.json({ success: true, data: Updatedidea });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

//Delete Idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = router;
