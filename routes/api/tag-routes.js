const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tg = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tg);
  } catch (error) {
    res.status(500).json(error);
  } 
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tg = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
     res.status(200).json(tg);
  } catch (error) {
    res.status(500).json(error);
   }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tg = await Tag.create(req.body);
    res.status(200).json(tg);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tg = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }});
      res.status(200).json(tg);
  } catch (error) {
    res.status(500).json(error);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tg = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(tg);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
