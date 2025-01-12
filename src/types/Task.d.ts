import { Entity } from "replyke";

export type Task = Entity & {
  metadata: TaskMetadata;
};

type TaskMetadata = {
  volunteersRequired: number | null;
  volunteersAssigned: number;
  applicants: string[];
  isCompleted: boolean;
};
