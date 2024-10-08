import request from './axios';

export const getAlgorithmCourse = async (category) => {
  return request.post('/openai/recommend', { category });
};

export const getGrading = async (data) => {
  return request.post('/openai/grade', { data });
};
