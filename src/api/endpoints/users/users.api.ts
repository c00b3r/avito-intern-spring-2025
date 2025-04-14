import { axiosClient } from '../../axios/axios-client';
import { UserResponse } from './users.type';

export const usersApi = {
  getAllUsers: async (): Promise<UserResponse> => {
    const { data } = await axiosClient.get<UserResponse>('/users');
    return data;
  },
  getUserById: async (userId: number): Promise<UserResponse> => {
    const { data } = await axiosClient.get<UserResponse>(`/users/${userId}`);
    return data;
  },
};
