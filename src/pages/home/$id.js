import { NavBar, Icon } from 'antd-mobile';
import marked from 'marked';
import hljs from 'highlight.js';

import './article.less';

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

export default props => {
  console.log(props);
  const onOpenChange = () => {
    props.history.goBack();
  };
  const output = marked(`**function a () {${props.match.params.id}}**`);
  return (
    <>
      <NavBar icon={<Icon type="left" />} onLeftClick={onOpenChange}>
        {props.match.params.id}
      </NavBar>
      <div dangerouslySetInnerHTML={{ __html: output }} />
    </>
  );
};
