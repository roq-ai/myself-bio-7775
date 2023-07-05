import axios from 'axios';
import queryString from 'query-string';
import { WorkInterface, WorkGetQueryInterface } from 'interfaces/work';
import { GetQueryInterface } from '../../interfaces';

export const getWorks = async (query?: WorkGetQueryInterface) => {
  const response = await axios.get(`/api/works${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWork = async (work: WorkInterface) => {
  const response = await axios.post('/api/works', work);
  return response.data;
};

export const updateWorkById = async (id: string, work: WorkInterface) => {
  const response = await axios.put(`/api/works/${id}`, work);
  return response.data;
};

export const getWorkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/works/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkById = async (id: string) => {
  const response = await axios.delete(`/api/works/${id}`);
  return response.data;
};
