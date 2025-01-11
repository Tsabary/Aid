type Task = {
  id: string;
  authorId: string;
  authorName: string | undefined;
  authorAvatar: string | undefined;
  description: string;
  volunteersRequired: number;
  volunteersAssigned: number;
  applicants: string[];
  status: TaskStatus; // open | in_progress | completed
  urgent: boolean;
  category: TaskCategory;
  startDate: Date;
  endDate: Date;
};
