import { Router } from 'express';
import { listAdmins, deleteAdmin, signup, login } from '../controllers/admin.controller';
import { superAdminAuth } from '../../../middleware/superAdminAuth';
import { validate } from '../../../validations/validateMiddleware';
import { deleteUserSchema } from '../../../validations/superAdminValidations';
import { signupSchema, loginSchema } from '../../../validations/userValidation';

const router = Router();

router.get('/', superAdminAuth, listAdmins);
router.delete('/:adminId', superAdminAuth, validate(deleteUserSchema), deleteAdmin);
router.post('/signup', superAdminAuth, validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;