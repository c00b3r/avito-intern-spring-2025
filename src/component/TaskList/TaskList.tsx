import { Empty, Flex, List } from 'antd';
import { Task } from '../../api/endpoints/tasks/tasks.types';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <Flex vertical className='h-[75vh] overflow-y-auto p-[2px]!' gap='small'>
      {tasks.length > 0 ? (
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <TaskItem
              key={task.id}
              task={task}
              setOpenModal={() => onTaskClick(task)}
            />
          )}
          pagination={{
            position: 'bottom',
            align: 'center',
            pageSize: 5,
            showPrevNextJumpers: false,
            showSizeChanger: false,
            total: tasks.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} из ${total} задач`,
            className: 'mb-2!',
          }}
        />
      ) : (
        <Empty description='Нет задач' />
      )}
    </Flex>
  );
}

export default TaskList;
