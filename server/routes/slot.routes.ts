import { Router } from 'express';
import * as SlotController from '../controllers/slot.controller';

const router = Router();

// Routes for the /slots endpoint
router.post('/', SlotController.createSlot);
router.get('/', SlotController.getAllSlots);

// Routes for the /slots/:id endpoint
router.get('/:id', SlotController.getSlotById);
router.put('/:id', SlotController.updateSlot);
router.delete('/:id', SlotController.deleteSlot);

// Miscellaneous routes
router.get('/search', SlotController.getFilteredSlots);

export default router;
