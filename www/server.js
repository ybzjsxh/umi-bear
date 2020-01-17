const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const chalk = require('chalk');
const { net, err } = require('./config/logger');

const controller = require('./controller');

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

router.get('/getArticleList', async (req, res) => {
  let result = await controller.getAll();
  res.json({
    code: 0,
    data: { list: result, count: result.length },
  });
});

router.get('/getArticleDetail', async (req, res) => {
  let id = req.query.id;
  let result = await controller.findArticle(id);
  res.json({
    code: 0,
    data: {
      title: result.title,
      detail: result.desc,
    },
  });
});

router.post('/addArticle', async (req, res) => {
  let result = await controller.addArticle(req.body);
  res.json({
    code: 0,
    success: true,
  });
});

router.post('/updateArticle', async (req, res) => {
  let result = await controller.updateArticle(req.body);
  if (!!result) {
    res.json({
      code: 0,
      success: true,
    });
  } else {
    res.json({
      code: -1,
      success: false,
    });
  }
});

router.delete('/delArticle', async (req, res) => {
  let result = await controller.delArticle(req.body.id);
  if (!!result) {
    res.json({
      code: 0,
      success: true,
    });
  } else {
    res.json({
      code: -1,
      success: false,
    });
  }
});

app.use('/api', router);

app.use('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  net.info(`后台服务启动成功：http://127.0.0.1:${port}`);
  console.log(chalk.blue(`listening on http://127.0.0.1:${port}`));
});
