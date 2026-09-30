import { Router } from 'express';
import { VaultController } from '../controllers/vault.controller';

const router = Router();

router.post('/users', VaultController.registerUser);
router.post('/items', VaultController.createVaultItem);
router.get('/items/:id', VaultController.getVaultItem);

export default router;