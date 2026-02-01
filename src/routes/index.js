import express from 'express';
import AdminAuthRoutes from '../modules/admin/auth/auth.routes.js';

const router = express.Router();

router.use('/admin/auth', AdminAuthRoutes);

export default router;