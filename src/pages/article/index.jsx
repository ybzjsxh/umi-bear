import React from 'react';
import { Icon as PICon } from 'antd';
import { NavBar, Icon, Toast, Button } from 'antd-mobile';
import marked from 'marked';
import SimpleMDE from 'react-simplemde-editor';
import hljs from 'highlight.js';
import { connect } from 'dva';

import 'easymde/dist/easymde.min.css';
// import styles from './article.less';

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
    };
  }

  async componentDidMount() {
    Toast.loading('加载中');
    const { dispatch, location } = this.props;
    const { id } = location.query;
    console.log(id);
    new Promise(resolve => {
      dispatch({
        type: 'article/getArticleDetail',
        payload: { resolve, params: { id } },
      });
    })
      .then(res => {
        Toast.hide();
        console.log('reeeee', res);
        if (res.code === 0) {
          this.setState({
            loading: false,
            title: res.data.title.title,
            content: res.data.detail.content,
          });
        }
        hljs.initHighlightingOnLoad();
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
    document.querySelector('.preview').click();
  }

  // componentDidUpdate() {
  //   this.setState((prevProps, preState) => ({

  //   }))
  // }

  handleLeftClick = () => {
    console.log('goBack');
    return this.props.history.goBack();
  };

  handleSave = () => {
    this.setState({ loading: true });
    Toast.loading('保存中', 0, null, true);
    const { dispatch, content, location } = this.props;
    const { id } = location.query;
    const { title } = this.state;
    new Promise(resolve => {
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
    }).then(res => {
      console.log('res :', res);
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
  };

  handleChange = value => {
    this.setState({ content: value });
  };

  render() {
    const { title, content } = this.state;
    console.log(this.props, this.state);
    return (
      <>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.handleLeftClick}
          rightContent={
            <Button
              size="small"
              style={{ background: 'rgba(0,180,0,.7)', color: '#fff' }}
              onClick={this.handleSave}
            >
              <PICon
                type={this.state.loading ? 'loading' : 'save'}
                style={{ marginRight: 16 }}
              />
              保存
            </Button>
          }
        >
          <div>{title}</div>
        </NavBar>
        <SimpleMDE
          onChange={this.handleChange}
          value={content}
          options={{
            autofocus: true,
            spellChecker: false,
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
            previewRender: plainText => {
              return marked(plainText, {
                renderer: new marked.Renderer(),
                gfm: true,
                pedantic: false,
                sanitize: false,
                tables: true,
                breaks: true,
                smartLists: true,
                smartypants: true,
                highlight: code => hljs.highlightAuto(code).value,
              });
            },
          }}
        />
      </>
    );
  }
}

export default Article;
