import React from 'react';

import styles from './index.less';
import { NavBar, Icon, Drawer, List } from 'antd-mobile';

export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleLeftClick = d => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const sidebar = (
      <List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
          if (index === 0) {
            return (
              <List.Item key={index} thumb="" multipleLine>
                Category
              </List.Item>
            );
          }
          return (
            <List.Item key={index} thumb="">
              Category{index}
            </List.Item>
          );
        })}
      </List>
    );
    return (
      <div className={styles.normal}>
        <NavBar
          id="my-navbar"
          className={styles['my-navbar']}
          mode="dark"
          icon={<Icon type="right" />}
          onLeftClick={() => this.handleLeftClick()}
          rightContent={<Icon key="0" type="search" style={{ marginRight: 16 }} />}
        >
          {window.location.pathname.replace('/', '')}
        </NavBar>
        <Drawer
          className="my-drawer"
          style={{
            minHeight: document.documentElement.clientHeight,
            position: 'relative',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          open={this.state.open}
        >
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}
