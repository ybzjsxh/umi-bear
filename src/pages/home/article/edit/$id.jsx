import styles from './edit.less';
import { Icon as PICon } from 'antd';
import { NavBar, Icon } from 'antd-mobile';

export default props => {
  const handleLeftClick = () => {
    console.log('click');
    return props.history.goBack();
  };
  console.log(props);
  return (
    <NavBar
      icon={<Icon type="left" />}
      onLeftClick={handleLeftClick}
      rightContent={<PICon type="save" style={{ marginRight: 16 }} onClick={()=>console.log('save')} />}
    >
      <div className={styles.title}>currently editing article: {props.match.params.id}</div>;
    </NavBar>
  );
};
