type TaskApplication = {
  id: string;
  task_id: string;
  task_authorId: string;
  applicant_id: string;
  applicant_name: string;
  applicant_phone_number: string;
  applicant_avatar?: string;
  additional_info: string;
  status: "new" | "assigned" | "dismissed";
};

type TaskApplicationDraft = Omit<TaskApplication, "id">;
