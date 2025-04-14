import { TaskStatus } from './enum';

export interface Filters {
  status: TaskStatus | '';
  boardId: number | '';
  search: string;
}
