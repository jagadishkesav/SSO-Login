import express from 'express';
const router = express.Router();
import { getDomains, patchDomains, deleteDomains } from './domain.controller';

router.get('/all', getDomains);
router.patch('/patch', patchDomains);
router.delete('/delete', deleteDomains);

export = router;
