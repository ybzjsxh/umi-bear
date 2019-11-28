// import mockjs from 'mockjs';

const articleList = [
  { title: 'Javascript', id: '12332' },
  { title: 'Python', id: '3123' },
  { title: 'Bash', id: '52343' },
];

const articleDetail = [
  { content: '```javascript\nfunction a () {}\n```' },
  { content: '```python\ndef():\nreturn 0\n```' },
  { content: '```bash\n echo "Hello"\n```' },
];

function getIndex(id) {
  return articleList.findIndex(i => id === i.id);
}

export default {
  'GET /api/getArticleList': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        data: { list: articleList, count: articleList.length },
      });
    }, 3000);
  },
  'GET /api/getArticleDetail': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 0,
        data: {
          title: articleList[getIndex(req.query.id)],
          detail: articleDetail[getIndex(req.query.id)],
        },
      });
    }, 3000);
  },
  'POST /api/updateArticle': (req, res) => {
    const { title, content } = req.query;
    articleList.push({ title, id: 3123 });
    articleDetail.push({ content });
    setTimeout(() => {
      res.send({
        code: 0,
        data: { list: [...articleList, ...articleDetail] },
      });
    }, 3000);
  },
  'DELETE /api/delArticle': (req, res) => {
    articleList.splice(req.body.index, 1);
    articleDetail.splice(req.body.index, 1);
    setTimeout(() => {
      res.send({
        code: 0,
        data: {
          list: [...articleList],
          detail: [...articleDetail],
          count: articleList.length,
        },
      });
    }, 3000);
  },
};
