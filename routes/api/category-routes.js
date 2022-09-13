const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const ctgry = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(ctgry);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const ctgry = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
     res.status(200).json(ctgry);
  } catch (error) {
    res.status(500).json(error);
   }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const ctgry = await Category.create(req.body);
    res.status(200).json(ctgry);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const ctgry = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); 
    res.status(200).json(ctgry); 
    }
      catch (error) {
        res.status(500).json(error);
  }});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const ctgry = Category.destroy({ where: { id: req.params.id } });
    res.status(200).json(ctgry);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
