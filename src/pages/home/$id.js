import { NavBar, Icon } from 'antd-mobile';
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

export default props => {
  console.log(props);
  const onOpenChange = () => {
    props.history.goBack();
  };
  return (
    <>
      <NavBar icon={<Icon type="left" />} onLeftClick={onOpenChange}>
        {props.match.params.id}
      </NavBar>
      <div dangerouslySetInnerHTML={{ __html: marked('```js \n function () {} \n ```') }} />
    </>
  );
};
