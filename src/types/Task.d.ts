type Task = {
  id: string;
  user: {
    id: string;
    name?: string | undefined | null;
    avatar?: string | undefined | null;
  };
  content: string;
  keywords: TaskCategory[];
  metadata: TaskMetadata;
};

type TaskMetadata = {
  volunteersRequired: number | null;
  volunteersAssigned: number;
  applicants: string[];
  status: TaskStatus; // open | in_progress | completed
  // startDate: Date;
  // endDate: Date;
};
