import { Router } from 'express';
import Ingredient from '../models/ingredient';

const router = Router();

router.get('/', async (req, res) => {
  const allIngredients = await Ingredient.find();
  return res.send({
    allIngredients,
    count: allIngredients.length,
  });
});

router.post('/', (req, res) => {
  const { name, kcal } = req.body;
  const newIngredient = new Ingredient({ name, kcal });
  newIngredient.save()
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(400).send(err);
    })
});

router.post('/search', async (req, res) => {
  const { search } = req.body;
  try {
    const findIngredient = await Ingredient.find({ name: new RegExp(search, 'ig') });
    if (findIngredient.length) {
      return res.send(findIngredient);
    } else {
      throw new Error(`Could not find any ingredients matching "${search}"`);
    }
  } catch (e) {
    return res.send(e);
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  const oldIngredient = await Ingredient.findById(id);
  if (oldIngredient) {
    return oldIngredient.remove()
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        return res.status(400).send(err);
      })
  }
  return res.status(404).send(`Could not find entry with id ${id}`);
});

export default router;