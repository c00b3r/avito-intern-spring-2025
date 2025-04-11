import { TaskStatus } from '../../../types/enum';

import { TaskPriority } from '../../../types/enum';

interface Board {
  description: string;
  id: number;
  name: string;
  taskCount: number;
}

interface BoardTask {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  description: string;
  id: number;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
}

interface BoardResponse {
  data: Board[];
}

export type { BoardResponse, Board, BoardTask };
