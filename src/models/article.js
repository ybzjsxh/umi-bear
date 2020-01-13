import {
  getArticleList,
  getArticleDetail,
  addArticle,
  delArticle,
  updateArticle,
} from '@/services/api';

export default {
  namespace: 'article',
  state: {
    articleList: [],
    total: 0,
    articleDetail: {
      _id: '',
      author: '',
      category: [],
      comments: [],
      create_time: '',
      desc: '',
      id: 16,
      img_url: '',
      keyword: [],
      like_users: [],
      meta: { views: 0, likes: 0, comments: 0 },
      origin: 0,
      state: 1,
      tags: [],
      title: '',
      update_time: '',
    },
  },
  effects: {
    *getArticleList({ payload }, { call, put }) {
      const { resolve } = payload;
      const articleList = JSON.parse(localStorage.getItem('articleList')) || [];
      const response = {
        code: 0,
        data: { list: articleList, count: articleList.length },
      };
      !!resolve && resolve(response);
      if (response.code === 0) {
        // yield put({ type: 'saveArticleList', payload: response.data.list });
        yield put({
          type: 'saveArticleListTotal',
          payload: response.data.count,
        });
      }
    },
    *getArticleDetail({ payload }, { call, put }) {
      const articleDetail = JSON.parse(localStorage.getItem('articleDetail')) || {};
      const { resolve, params } = payload;
      let response = {
        code: 0,
        data: {
          // title: articleList[getIndex(req.query.id)],
          detail: articleDetail[params.id],
        },
      };
      !!resolve && resolve(response);
      if (response.code === 0) {
        yield put({ type: 'saveArticleDetail', payload: response.data });
      }
    },
    *addArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      console.log(params);
      let response = {
        code: 0,
        data: [],
      };
      !!resolve && resolve(response);
      yield put({ type: 'saveArticleList', payload: response.data });
    },
    *updateArticle({ payload }, { call, put }) {},
    *delArticle({ payload }, { call, put }) {},
  },

  reducers: {
    saveArticleList(state, { payload }) {
      let res = {
        ...state,
        articleList: payload,
      };
      localStorage.removeItem('articleList');
      localStorage.setItem('articleList', JSON.stringify(res));
      return res;
    },

    saveArticleListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },

    saveArticleDetail(state, { payload }) {
      return {
        ...state,
        articleDetail: payload,
      };
    },
  },
};
