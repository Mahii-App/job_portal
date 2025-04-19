// import { HTTP_CODES } from '../../../utils/httpCodes';
import { ErrorMessages  } from '../../../utils/errorMessage';
import { notificationService } from '../../../services/notification.service';
import Interview from '../models/Interview';
import Application from '../../user/models/Application';
import {User }from '../../user/models/user';

export const interviewService = {
  scheduleInterview: async (applicationId: string, scheduledAt: Date, adminId: string): Promise<any> => {
    const application = await Application.findById(applicationId).populate('user');
    if (!application) throw new Error(ErrorMessages.APPLICATION_NOT_FOUND);
    const user = application.user as unknown as InstanceType<typeof User>;
    const interview = new Interview({
      application: applicationId,
      scheduledAt,
      interviewer: adminId,
    });
    await interview.save();
    await notificationService.sendEmail(
      user.email,
      'Interview Scheduled',
      `Your interview is scheduled for ${scheduledAt.toLocaleString()}`
    );
    await notificationService.scheduleReminder(
      user.email,
      'Interview Reminder',
      `Reminder: Your interview is on ${scheduledAt.toLocaleString()}`,
      scheduledAt
    );
    return interview;
  },
};