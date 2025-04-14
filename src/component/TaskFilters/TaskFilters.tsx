import { Badge, Button, Flex, Input, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import { TaskStatus } from '../../types/enum';
import { Board } from '../../api/endpoints/boards/boards.types';
import { Filters } from '../../types/interface';

interface TaskFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | number) => void;
  boards?: Board[];
  totalTasks: number;
  onCreateTask: () => void;
}

function TaskFilters({
  filters,
  onFilterChange,
  boards,
  totalTasks,
  onCreateTask,
}: TaskFiltersProps) {
  return (
    <Flex justify='space-between'>
      <Badge color='blue' count={totalTasks}>
        <Title level={3}>Задачи</Title>
      </Badge>
      <Flex gap='middle' justify='end' className='h-[32px] w-1/2'>
        <Input
          placeholder='Поиск'
          className='w-40!'
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
        <Select
          placeholder='Статус'
          allowClear
          className='w-40'
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
        >
          <Select.Option value={TaskStatus.Backlog}>Бэклог</Select.Option>
          <Select.Option value={TaskStatus.InProgress}>
            В процессе
          </Select.Option>
          <Select.Option value={TaskStatus.Done}>Выполнено</Select.Option>
        </Select>
        <Select
          placeholder='Проект'
          allowClear
          className='w-80'
          value={filters.boardId}
          onChange={(value) => onFilterChange('boardId', value)}
        >
          {boards?.map((board) => (
            <Select.Option key={board.id} value={board.id}>
              {board.name}
            </Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={onCreateTask}>
          Добавить задачу
        </Button>
      </Flex>
    </Flex>
  );
}

export default TaskFilters;
