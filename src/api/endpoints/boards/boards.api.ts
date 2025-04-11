import { axiosClient } from '../../axios/axios-client';
import { BoardResponse, BoardTask } from './boards.types';

export const boardsApi = {
  getAllBoards: async () => {
    const response = await axiosClient.get<BoardResponse>('/boards');
    return response.data;
  },
  getBoardById: async (boardId: string) => {
    const response = await axiosClient.get<BoardTask[]>(`/boards/${boardId}`);
    return response.data;
  },
};
