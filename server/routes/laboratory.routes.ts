import { Router } from 'express';
import * as LaboratoryController from '../controllers/laboratory.controller.js';

const router = Router();

// Routes for the /laboratories endpoint
router.post('/', LaboratoryController.createLaboratory);
router.get('/', LaboratoryController.getAllLaboratories);

// Routes for the /laboratories/:id endpoint
router.get('/:id', LaboratoryController.getLaboratoryById);
router.put('/:id', LaboratoryController.updateLaboratory);
router.delete('/:id', LaboratoryController.deleteLaboratory);

export default router;
