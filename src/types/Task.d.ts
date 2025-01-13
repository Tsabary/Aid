import { Entity } from "replyke";

export type Task = Entity & {
  metadata: TaskMetadata;
};

type TaskMetadata = {
  volunteersRequired: number | null;
  applicants: string[];
  assigned: string[];
  dismissed: string[];
  isCompleted: boolean;
};
