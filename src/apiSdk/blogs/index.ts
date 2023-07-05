import axios from 'axios';
import queryString from 'query-string';
import { BlogInterface, BlogGetQueryInterface } from 'interfaces/blog';
import { GetQueryInterface } from '../../interfaces';

export const getBlogs = async (query?: BlogGetQueryInterface) => {
  const response = await axios.get(`/api/blogs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBlog = async (blog: BlogInterface) => {
  const response = await axios.post('/api/blogs', blog);
  return response.data;
};

export const updateBlogById = async (id: string, blog: BlogInterface) => {
  const response = await axios.put(`/api/blogs/${id}`, blog);
  return response.data;
};

export const getBlogById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/blogs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBlogById = async (id: string) => {
  const response = await axios.delete(`/api/blogs/${id}`);
  return response.data;
};
