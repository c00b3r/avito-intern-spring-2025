import { TaskStatus, TaskPriority } from '../types/enum';

const statusColors = {
  [TaskStatus.Backlog]: 'blue',
  [TaskStatus.InProgress]: 'gold',
  [TaskStatus.Done]: 'green',
};

const statusName = {
  [TaskStatus.Backlog]: 'Бэклог',
  [TaskStatus.InProgress]: 'В процессе',
  [TaskStatus.Done]: 'Выполнено',
};

const priorityColors = {
  [TaskPriority.Low]: 'cyan',
  [TaskPriority.Medium]: 'magenta',
  [TaskPriority.High]: 'red',
};
const priorityName = {
  [TaskPriority.Low]: 'Низкий',
  [TaskPriority.Medium]: 'Средний',
  [TaskPriority.High]: 'Высокий',
};

export { statusColors, statusName, priorityColors, priorityName };
