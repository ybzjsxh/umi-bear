import 'antd-mobile/dist/antd-mobile.less';
import styles from './index.less';

import Home from './home';

export default function() {
  return (
    <div className={styles.normal}>
      <Home />
    </div>
  );
}
