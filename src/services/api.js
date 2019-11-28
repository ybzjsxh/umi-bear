import { stringify } from 'querystring';
import request from '@/utils/request';

export async function queryArticle(params) {
  return request(`/api/getArticleList`);
}

export async function getArticleDetail(params) {
  return request(`/api/getArticleDetail?${stringify(params)}`);
}

export async function addArticle(params) {
  return request(`/api/addArticle`, {
    method: 'POST',
    data: params,
  });
}

export async function delArticle(params) {
  return request('/api/delArticle', {
    method: 'DELETE',
    data: params,
  });
}

export async function updateArticle(params) {
  return request('/api/updateArticle', {
    method: 'POST',
    data: params,
  });
}
