//  export type Task = {
//   id: string;
//   user_id: string;
//   title: string;
//   description: string;
//   status: TypeTaskStatus;
//   created_at: string;
// };


export enum TypeTaskStatus {
  pending = "pending",
  inprogress = "in-progress",
  done = "done",
}


export type TaskType = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: TypeTaskStatus;
  inserted_at: string;
};
