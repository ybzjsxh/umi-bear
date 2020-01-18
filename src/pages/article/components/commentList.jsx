import React, { useState } from 'react';
import { connect } from 'dva'

@connect(({article})=>({article}))
class commentList extends React.Component {
  // const [comment, setComment] = useState('');

  render() {
    return (
      <>
        {this.props.article.articleDetail.title}
      </>
    );

  }
};

export default commentList;
