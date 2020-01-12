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
      content: ''
    },
  },
  effects: {
    // *getArticleList({ payload }, { call, put }) {
    // },
    // *getArticleDetail({ payload }, { call, put }) {
    // },
    // *addArticle({ payload }, { call, put }) {
    // },
    // *updateArticle({ payload }, { call, put }) {
    // },
    // *delArticle({ payload }, { call, put }) {
    // },
  },

  reducers: {
    getArticleList(state, { payload }) {
      const { resolve } = payload;
      let res = {
        articleList: state.articleList,
        total: state.total,
      };
      !!resolve && resolve(res);
    },
    addArticle(state, {payload}) {
      const { resolve, params} = payload;
      let res = {
        ...state,
        total: state.total+1,
        articleDetail: { content: params.content}
      }
      !!resolve && resolve(res)
    },
    saveArticleList(state, { payload }) {
      let res = {
        ...state,
        articleList: payload,
      };
      return res;
    },

    saveArticleListTotal(state, { payload }) {
      let res = {
        ...state,
        total: payload,
      };
      return res;
    },

    saveArticleDetail(state, { payload }) {
      let res = {
        ...state,
        articleDetail: payload,
      };
      return res;
    },
  },
};
