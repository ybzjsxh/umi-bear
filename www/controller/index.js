const day = require('dayjs');
const Article = require('../models/article');

const { net, err } = require('../config/logger');

const getAll = async () => {
  let result = await Article.find({}, { __v: 0, desc: 0 }, error => {
    if (error) {
      err.error(error);
    } else {
      return
    }
  });
  return result;
};

const findArticle = async _id => {
  let result = await Article.findOne({ _id }, { __v: 0 }, (error, doc) => {
    if (error) {
      err.error(error);
    } else {
      net.info(`查找article ${doc.title}`);
    }
  });
  return result;
};

const addArticle = async req => {
  let newArticle = new Article();
  newArticle.author = null;
  newArticle.category = null;
  newArticle.comments = null;
  newArticle.create_time = day().format();
  newArticle.desc = req.content;
  newArticle.title = req.title;
  await newArticle.save((error, doc) => {
    if (error) {
      err.error(error);
    } else {
      net.info(`增加article ${doc.title}`);
      return true;
    }
  });
};

const updateArticle = async req => {
  let { id, title, content } = req;
  let updateQuery = !!title
    ? { desc: content, update_time: day().format() }
    : { title, desc: content, update_time: day().format() };
  // console.log(req, update);
  let result = await Article.updateOne(
    { _id: id },
    { $set: updateQuery },
    (error, doc) => {
      if (error) {
        err.error(error);
      } else {
        net.info(`更新article：${doc.title}`);
      }
    },
  );
  return result;
};

const delArticle = async _id => {
  let result = await Article.deleteOne({ _id }, (error, doc) => {
    if (error) {
      err.error(error);
    } else {
      // console.log(doc);
      net.info(`删除article ${doc.title}`)
    }
  });
  return result;
};

module.exports = {
  getAll,
  findArticle,
  addArticle,
  updateArticle,
  delArticle,
};
