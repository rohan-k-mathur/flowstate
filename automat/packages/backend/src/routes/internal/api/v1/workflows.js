import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { nodes, edges } = req.body || {};
  res.status(201).json({ success: true, nodes, edges });
});

export default router;
