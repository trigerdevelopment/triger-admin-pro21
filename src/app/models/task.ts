
export class Task {
  id:string;
  task: string;
  asignedTo:string;
  status: string;
  priority:string;
  requestby:string;
  date: string;
  completedDate: string;
  completed:boolean;

  constructor(task: string, asignedTo: string, status: string, priority: string, requestby:string, date:string,
     completedDate:string, completed:boolean) {
      this.task = task;
      this.asignedTo = asignedTo;
      this.status = status;
      this.priority = priority;
      this.requestby = requestby;
      this.date = date;
      this.completedDate = completedDate;
      this.completed = completed;
  }
}
