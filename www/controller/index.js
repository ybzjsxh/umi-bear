const dayjs = require('dayjs');
const Article = require('../models/article');

const { net, err } = require('../config/logger');

const getAll = async () => {
  let result = await Article.find({}, { __v: 0, desc: 0 }, error => {
    if (error) {
      err.error(error);
    } else {
      return;
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
      return doc
    }
  });
  return result;
};

const addArticle = async req => {
  let newArticle = new Article();
  newArticle.author = req.author ? req.author : '';
  newArticle.create_time = dayjs().format();
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
    ? { desc: content, update_time: dayjs().format() }
    : { title, desc: content, update_time: dayjs().format() };
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
      net.info(`删除article ${doc.title}`);
    }
  });
  return result;
};

const addComment = async ({ id, content }) => {
  let c = await findArticle(id);
  let new_comments = c.comments;
  console.log(id, content, c);
  new_comments.push({ content, commentTime: dayjs().format() });
  console.log(new_comments);
  let result = await Article.updateOne(
    { _id: id },
    {
      $set: { comments: new_comments },
    },
    (error, doc) => {
      if (error) {
        err.error(error);
      } else {
        net.info(`更新评论${c.title}`);
      }
    },
  );
  return result;
};

module.exports = {
  getAll,
  findArticle,
  addArticle,
  updateArticle,
  delArticle,
  addComment,
};
