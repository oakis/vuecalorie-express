import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('This is the ingredients endpoint');
});

export default router;