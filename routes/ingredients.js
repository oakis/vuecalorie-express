import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('This is the ingredients endpoint');
});

router.post('/', (req, res) => {
  return res.send(req.body);
})

export default router;