const db = require('../config/db');

let Schema = db.Schema;

let articleSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    author: String,
    category: Array,
    comments: Array,
    create_time: Date,
    desc: String,
    img_url: String,
    keyword: Array,
    like_users: Array,
    meta: { views: Number, likes: Number, comments: Number },
    origin: Number,
    state: Number,
    tags: Array,
    title: String,
    update_time: Date,
  },
  { collection: 'article' },
);
let Article = db.model('article', articleSchema);

module.exports = Article;
