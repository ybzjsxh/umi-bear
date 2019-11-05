import React from 'react';
import { Icon as PICon } from 'antd';
import { NavBar, Icon } from 'antd-mobile';
import marked from 'marked';
import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';

import 'simplemde/dist/simplemde.min.css';
// import styles from './edit.less';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smde: null,
    };
  }

  componentDidMount() {
    this.setState({
      smde: new SimpleMDE({
        element: document.getElementById('editor').childElementCount,
        autofocus: true,
        autosave: true,
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
      }),
    });
  }

  handleLeftClick = () => {
    console.log('click');
    return this.props.history.goBack();
  };

  render() {
    console.log(this.props);
    return (
      <>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.handleLeftClick}
          rightContent={
            <PICon type="save" style={{ marginRight: 16 }} onClick={() => console.log('save')} />
          }
        >
          <div>currently editing article: {this.props.match.params.id}</div>
        </NavBar>
        <div title="添加与修改文章" width="1200px">
          <textarea id="editor" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} />
        </div>
      </>
    );
  }
}

export default Edit;
