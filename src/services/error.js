import request from '@utils/request';

export default async function queryCode(code) {
  return request(`/api/${code}`);
}
