import { useQuery } from '@tanstack/react-query';
import { boardsApi } from '../../endpoints/boards/boards.api';

export const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => boardsApi.getAllBoards(),
  });
};

export const useBoard = (boardId: number) => {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => boardsApi.getBoardById(boardId),
  });
};
