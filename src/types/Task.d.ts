import { Entity } from "@replyke/react-js";

export type Task = Entity & {
  metadata: TaskMetadata;
};

type TaskMetadata = {
  volunteersRequired: number | null;
  locationName: string;
};
