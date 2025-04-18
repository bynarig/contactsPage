// client/src/entities/github.ts - Update this
import axios from 'axios';
import {Repository} from './types/github.types';

import {BACKEND_IP} from '#env';

const API_BASE_URL = `${BACKEND_IP}/github`;

export const fetchRepositories = async (username: string): Promise<Repository[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getrepos`, {});
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
};