import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { Icon as PICon} from 'antd';
import { connect } from 'dva';
import marked from 'marked';
import hljs from 'highlight.js';

import './article.less';
import 'highlight.js/styles/atom-one-dark.css';


marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => hljs.highlightAuto(code).value,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

@connect(({ loading }) => ({
  loading: loading.global,
}))
class Article extends React.Component {

  componentDidMount() {
    console.log(this.props.loading, this.props);
    hljs.initHighlightingOnLoad()
  }

  onOpenChange = () => {
    this.props.history.goBack();
  };

  handleEdit = () => {
    const { history, match } = this.props;
    history.push(`/home/article/edit/${match.params.id}`)
  }

  render() {
    return (
      <>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.onOpenChange}
          rightContent={
            <PICon type="edit" style={{ marginRight: 16 }} onClick={this.handleEdit} />
          }
        >
          {this.props.match.params.id}
        </NavBar>
        <div dangerouslySetInnerHTML={{ __html: marked('```js \n function () {} \n ```') }} />
      </>
    );
  }
}

export default Article;
