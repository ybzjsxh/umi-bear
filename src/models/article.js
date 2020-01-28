import {
  queryArticle,
  getArticleDetail,
  addArticle,
  delArticle,
  updateArticle,
  addComment,
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
    *queryArticle({ payload }, { call, put }) {
      const { resolve } = payload;
      const response = yield call(queryArticle);
      !!resolve && resolve(response);
      if (response.code === 0) {
        yield put({
          type: 'saveArticleList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveArticleListTotal',
          payload: response.data.count,
        });
      }
    },

    *getArticleDetail({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getArticleDetail, params);
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveArticleDetail',
          payload: response.data,
        });
      }
      !!resolve && resolve(response);
    },

    *addArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addArticle, params);
      !!resolve && resolve(response);
    },

    *updateArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(updateArticle, params);
      !!resolve && resolve(response);
    },

    *delArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(delArticle, params);
      if (response.code === 0) {
        yield put({ type: 'queryArticle', payload: resolve });
      }
      !!resolve && resolve(response);
    },

    *addComment({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addComment, params);
      if (response.code === 0) {
        // yield call(getArticleDetail, params);
        yield put({
          type: 'getArticleDetail',
          payload: { resolve, params: { id: params.id } },
        });
      }
      !!resolve && resolve(response);
    },
  },

  reducers: {
    saveArticleList(state, { payload }) {
      return {
        ...state,
        articleList: payload,
      };
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

    // saveComment(state, { payload }) {
    //   return {
    //     ...state,
    //     comments: payload,
    //   };
    // },
  },
};
