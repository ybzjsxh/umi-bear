import { useState /* useEffect */ } from 'react';
import { Button, TextareaItem, Toast } from 'antd-mobile';

import styles from './comment.less';

export default ({ dispatch, location, loading }) => {
  const [content, setContent] = useState('');
  // useEffect(() => {}, []);

  const handleSubmit = () => {
    const { id } = location.query;
    if (!!content) {
      Toast.loading('提交中', 0, null, true);
      new Promise(resolve => {
        dispatch({
          type: 'article/addComment',
          payload: {
            resolve,
            params: {
              id,
              content,
            },
          },
        });
      })
        .then(res => {
          if (res.code === 0) {
            Toast.hide();
            setContent('');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Toast.fail('请填写评论后再提交', 2, null, true);
    }
  };
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
