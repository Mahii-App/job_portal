import Report from '/home/user/job_PORTAL/src/modules/superadmin/models/Report';
import {User }from '../../user/models/user';
import Job from '../../admin/models/Job';
import Application from '../../user/models/Application';

export const reportService = {
  generateUserActivityReport: async (superAdminId: string): Promise<any> => {
    const userCount = await User.countDocuments();
    const report = new Report({
      title: 'User Activity Report',
      type: 'user_activity',
      data: { userCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },

  generateJobActivityReport: async (superAdminId: string): Promise<any> => {
    const jobCount = await Job.countDocuments();
    const report = new Report({
      title: 'Job Activity Report',
      type: 'job_activity',
      data: { jobCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },

  generateApplicationStatsReport: async (superAdminId: string): Promise<any> => {
    const applicationCount = await Application.countDocuments();
    const report = new Report({
      title: 'Application Stats Report',
      type: 'application_stats',
      data: { applicationCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },
};