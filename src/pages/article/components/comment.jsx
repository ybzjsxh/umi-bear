import { useState, useEffect } from 'react';
import { Button, TextareaItem } from 'antd-mobile';

import styles from './comment.less';

export default () => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {};
  return (
    <>
      <div className={styles.title}>撰写评论：</div>
      <TextareaItem
        className={styles.area}
        rows={3}
        placeholder="在这里写下你的评论吧..."
        value={content}
        onChange={setContent}
      />
      <Button type="primary" onClick={() => handleSubmit()}>
        提交评论
      </Button>
    </>
  );
};
