import React /* { useState } */ from 'react';
import { List } from 'antd-mobile';
import dayjs from 'dayjs';

import styles from './commentList.less';

export default ({ article }) => {
  // const [comment, setComment] = useState('');

  return (
  <>
    <div className={styles.title}>评论列表：</div>
    {article.articleDetail.comments.length === 0 ? (
      <span>快来占个沙发吧！</span>
    ) : (
      <List>
        {article.articleDetail.comments.map((i, index) => (
          <List.Item key={index}>
            <div>{i.content}</div>
            <div className={styles.commentTime}>
              评论于：{dayjs(i.commentTime).format('YYYY-MM-DD HH:mm')}
            </div>
          </List.Item>
        ))}
        <hr />
      </List>
    )}
  </>);
};
