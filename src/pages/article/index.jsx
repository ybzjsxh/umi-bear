import React from 'react';
import { LeftOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { NavBar, Icon, Toast, Button } from 'antd-mobile';
import marked from 'marked';
import SimpleMDE from 'react-simplemde-editor';
import hljs from 'highlight.js';
import { connect } from 'dva';

import 'easymde/dist/easymde.min.css';
import Comment from './components/comment';
import CommentList from './components/commentList';
import styles from './article.less';

@connect(({ loading, article }) => ({
  loading: loading.global,
  article,
}))
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      loading: false,
      id: '',
    };
  }

  async componentDidMount() {
    Toast.loading('加载中');
    const { dispatch, location } = this.props;
    const { id } = location.query;
    console.log(`id: ${id || '没有'}`);
    if (!!id) {
      this.setState({ id });
      new Promise((resolve) => {
        dispatch({
          type: 'article/getArticleDetail',
          payload: { resolve, params: { id } },
        });
      })
        .then((res) => {
          Toast.hide();
          // console.log('reeeee', res);
          if (res.code === 0) {
            this.setState({
              loading: false,
              title: res.data.title,
              content: res.data.detail,
            });
          }
          hljs.initHighlightingOnLoad();
        })
        .catch((err) => {
          this.setState({ loading: false });
          // console.log(err);
        });
      // document.querySelector('.preview').click();
    } else {
      Toast.hide();
    }
  }

  handleLeftClick = () => {
    // console.log('goBack');
    return this.props.history.goBack();
  };

  handleSave = () => {
    this.setState({ loading: true });
    Toast.loading('保存中', 0, null, true);
    const { dispatch, location } = this.props;
    const { id } = location.query;
    const { title, content } = this.state;
    if (!!id) {
      new Promise((resolve) => {
        dispatch({
          type: 'article/updateArticle',
          payload: {
            resolve,
            params: {
              id,
              title,
              content,
            },
          },
        });
      }).then((res) => {
        // console.log('res :', res);
        if (res.code === 0) {
          this.setState({
            loading: false,
            // content: res.data.list,
          });
          Toast.hide();
          this.props.history.goBack();
        } else {
          Toast.fail(`${res.message}`, 1, null, true);
        }
      });
    } else {
      if (!!title && !!content) {
        new Promise((resolve) => {
          dispatch({
            type: 'article/addArticle',
            payload: {
              resolve,
              params: {
                title,
                content,
              },
            },
          });
        }).then((res) => {
          // console.log(res);
          if (res.code === 0) {
            this.setState({
              loading: false,
            });
            Toast.hide();
            this.props.history.goBack();
          } else {
            Toast.fail(`${res.message}`, 1, null, true);
          }
        });
      } else {
        this.setState({
          loading: false,
        });
        Toast.fail(`标题或内容不能为空！`, 3, null, true);
      }
    }
  };

  handleChange = (value) => {
    this.setState({ content: value });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { title, content, id } = this.state;
    // console.log(this.props, this.state);
    return (
      <>
        <NavBar
          className={styles.navbar}
          mode="dark"
          icon={<LeftOutlined />}
          onLeftClick={this.handleLeftClick}
          rightContent={
            <Button
              size="small"
              style={{
                background: 'rgba(0,180,0,.7)',
                color: '#fff',
                marginRight: 15,
              }}
              onClick={this.handleSave}
            >
              {this.state.loading ? (
                <LoadingOutlined style={{ marginRight: 16 }} />
              ) : (
                <SaveOutlined style={{ marginRight: 16 }} />
              )}
              保存
            </Button>
          }
        >
          {title && <div>{title}</div>}
        </NavBar>
        {!id && (
          <div className={styles.title}>
            <span>标题：</span>
            <input onChange={this.handleTitleChange} placeholder="请输入标题" />
          </div>
        )}
        <SimpleMDE
          className={styles.markdown}
          onChange={this.handleChange}
          value={content}
          options={{
            autofocus: true,
            spellChecker: true,
            insertTexts: {
              horizontalRule: ['', '\n\n-----\n\n'],
              image: ['![](http://', ')'],
              link: ['[', '](http://)'],
              table: [
                '',
                '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n',
              ],
            },
            toolbar: [
              'bold',
              'italic',
              'heading',
              '|',
              'code',
              'quote',
              'ordered-list',
              'unordered-list',
              '|',
              'link',
              'image',
              '|',
              'fullscreen',
              'preview',
              'side-by-side',
            ],
            toolbarTips: true,
            renderingConfig: { codeSyntaxHighlighting: true },
            previewRender: (plainText) => {
              return marked(plainText, {
                renderer: new marked.Renderer(),
                gfm: true,
                pedantic: false,
                sanitize: false,
                tables: true,
                breaks: true,
                smartLists: true,
                smartypants: true,
                highlight: (code) => hljs.highlightAuto(code).value,
              });
            },
          }}
        />
        {!!id && <Comment {...this.props} />}
        {!!id && <CommentList {...this.props} />}
      </>
    );
  }
}

export default Article;
