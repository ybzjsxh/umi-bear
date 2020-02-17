import React /* { useState } */ from 'react';
import { List, PullToRefresh } from 'antd-mobile';
import dayjs from 'dayjs';

import styles from './commentList.less';

export default ({ article, loading }) => {
  // const [comment, setComment] = useState('');

  return (
    <>
      <div className={styles.title}>评论列表：</div>
      {article.articleDetail.comments.length === 0 ? (
        <span>快来占个沙发吧！</span>
      ) : (
        <PullToRefresh
          // damping={60}
          // ref={el => (this.ptr = el)}
          style={{
            height: 300,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction={'up'}
          refreshing={loading}
          onRefresh={() => {
            console.log('refressh');
          }}
        >
          <List>
            {article.articleDetail.comments
              .sort((a, b) => {
                return a.commentTime < b.commentTime ? 1 : -1;
              })
              .map((i, index) => (
                <List.Item key={index}>
                  <div>{i.content}</div>
                  <div className={styles.commentTime}>
                    评论于：{dayjs(i.commentTime).format('YYYY-MM-DD HH:mm')}
                  </div>
                </List.Item>
              ))}
            <hr />
          </List>
        </PullToRefresh>
      )}
    </>
  );
};
