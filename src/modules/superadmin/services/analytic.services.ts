import { cacheService } from '../../../services/cache.service';
import {User }from '../../user/models/user';
import Admin from '../../admin/models/Admin';
import Job from '../../admin/models/Job';
import Application from '../../user/models/Application';

export const analyticsService = {
  getAnalytics: async (): Promise<any> => {
    const cachedAnalytics = await cacheService.get('analytics');
    if (cachedAnalytics) return JSON.parse(cachedAnalytics);

    const userCount = await User.countDocuments();
    const adminCount = await Admin.countDocuments();
    const jobCount = await Job.countDocuments();
    const applicationCount = await Application.countDocuments();
    const analytics = { userCount, adminCount, jobCount, applicationCount };

    await cacheService.set('analytics', JSON.stringify(analytics), 3600);
    return analytics;
  },
};