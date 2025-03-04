// client/src/entities/github.ts
import axios from 'axios';
import { Repository } from './types/github.types';

const API_BASE_URL = 'http://localhost:8905/github';

export const fetchRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getrepos`, {
      params: { username }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};