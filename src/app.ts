import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
//import { swaggerSpec } from './config/swagger';
import swaggerSpec from './config/swagger';
// import { setupSwagger } from './config/swagger';
import userAuthRoutes from './modules/user/routes/auth.routes';
import userJobRoutes from './modules/user/routes/job.routes';
import userResumeRoutes from './modules/user/routes/resume.routes';
import adminAuthRoutes from './modules/admin/routes/auth.routes';
import adminJobRoutes from './modules/admin/routes/job.routes';
import adminInterviewRoutes from './modules/admin/routes/interview.routes';
import superAdminUserRoutes from './modules/superadmin/routes/user.routes';
import superAdminAdminRoutes from './modules/superadmin/routes/admin.routes';
import superAdminJobRoutes from './modules/superadmin/routes/job.routes';
import superAdminAnalyticsRoutes from './modules/superadmin/routes/analytic.routes';
import superAdminReportRoutes from './modules/superadmin/routes/report.routes';
import { errorHandler } from './middleware/errorHandler';
import superAdminAuthRoutes from './modules/superadmin/routes/admin.routes'; // or rename the file for clarity

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Routes
// app.use('/api/user/auth', userAuthRoutes);

app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/jobs', userJobRoutes);
app.use('/api/user/resume', userResumeRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/jobs', adminJobRoutes);
app.use('/api/admin/interviews', adminInterviewRoutes);
app.use('/api/superadmin/users', superAdminUserRoutes);
app.use('/api/superadmin/admins', superAdminAdminRoutes);
app.use('/api/superadmin/jobs', superAdminJobRoutes);
app.use('/api/superadmin/analytics', superAdminAnalyticsRoutes);
app.use('/api/superadmin/reports', superAdminReportRoutes);
app.use('/api/superadmin/auth', superAdminAuthRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler
app.use(errorHandler);

export default app;