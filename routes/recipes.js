import { Router } from 'express';
import Recipe from '../models/recipe';

const router = Router();

router.get('/', async (req, res) => {
  const allRecipes = await Recipe.find();
  return res.send({
    allRecipes,
    count: allRecipes.length,
  });
});

router.get('/:id', async (req, res) => {
  try {
    const findRecipe = await Recipe.find({ _id: req.params.id });
    return res.json(findRecipe[0]);
  } catch (e) {
    return res.status(404).send(`Could not find recipe with id ${req.params.id}`);
  }
});

router.post('/search', async (req, res) => {
  const { search } = req.body;
  const findRecipe = await Recipe.find({ name: new RegExp(search, 'ig') });
  if (findRecipe.length) {
    return res.send(findRecipe);
  }
  return res.status(404).send(`Could not find any recipe matching "${search}"`);
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    const oldRecipe = await Recipe.findById(id);
    return oldRecipe.remove()
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        return res.status(400).send(err);
      })
  } catch (e) {
    return res.status(404).send(`Could not find entry with id ${id}`);
  }
});

router.post('/', (req, res) => {
  const { name, ingredients } = req.body;
  const newRecipe = new Recipe({ name, ingredients });
  newRecipe.save()
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(400).send(err);
    })
});

export default router;