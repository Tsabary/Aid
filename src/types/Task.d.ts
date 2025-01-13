import { Entity } from "replyke";

export type Task = Entity & {
  metadata: TaskMetadata;
};

type TaskMetadata = {
  volunteersRequired: number | null;
  locationName: string;
  applicants: string[];
  assigned: string[];
  dismissed: string[];
  isCompleted: boolean;
};
