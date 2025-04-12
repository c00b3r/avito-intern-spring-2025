import { axiosClient } from '../../axios/axios-client';
import { BoardResponse, BoardTaskResponse } from './boards.types';

export const boardsApi = {
  getAllBoards: async () => {
    const response = await axiosClient.get<BoardResponse>('/boards');
    return response.data;
  },
  getBoardById: async (boardId: string) => {
    const response = await axiosClient.get<BoardTaskResponse>(
      `/boards/${boardId}`
    );
    return response.data;
  },
};
