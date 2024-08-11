import { Router } from 'express';

const router = Router();

router.get('/product', (request, response) => { });
router.get('/product/:id', (request, response) => { });
router.post('/product', (request, response) => { });
router.put('/product/:id', (request, response) => { });
router.delete('/product/:id', (request, response) => { });

router.get('/update', (request, response) => { });
router.get('/update/:id', (request, response) => { });
router.post('/update', (request, response) => { });
router.put('/update/:id', (request, response) => { });
router.delete('/update/:id', (request, response) => { });

router.get('/update-point', (request, response) => { });
router.get('/update-point/:id', (request, response) => { });
router.post('/update-point', (request, response) => { });
router.put('/update-point/:id', (request, response) => { });
router.delete('/update-point/:id', (request, response) => { });

export default router;
