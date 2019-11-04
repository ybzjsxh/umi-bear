import React from 'react';
import { NavBar, Drawer, List } from 'antd-mobile';
import { Affix, Button, Icon } from 'antd';

import styles from './index.less';
import { connect } from 'dva';

const Item = List.Item;

@connect(({ loading }) => ({ loading: loading.global }))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: false,
      content: [
        { title: '1', content: '312123123' },
        { title: '2', content: '312123123' },
        { title: '3', content: '312123123' },
      ],
    };
  }

  handleLeftClick = d => {
    this.setState({ open: !this.state.open });
  };

  handleSearch = content => {
    console.log('search');
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
      <>
        <NavBar
          id="my-navbar"
          className={styles['my-navbar']}
          mode="dark"
          icon={<Icon type={this.state.open ? 'left' : 'right'} />}
          onLeftClick={this.handleLeftClick}
          rightContent={
            <Icon type="search" style={{ marginRight: 16 }} onClick={this.handleSearch} />
          }
        >
          {window.location.pathname.replace('/', '')}
        </NavBar>
        <Drawer
          className={styles['my-drawer']}
          style={{
            minHeight: document.documentElement.clientHeight,
          }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.handleLeftClick}
        >
          <List
            renderHeader={() => 'Text Wrapping'}
            className={styles['my-list']}
            loading={{
              spinning: this.props.loading,
              indicator: <Icon type="loading" />,
              size: 'large',
              tip: '正在加载数据...',
            }}
          >
            {this.state.content.map((i, index) => (
              <Item
                arrow="horizontal"
                onClick={() => this.props.history.push(`/home/article/${index}`)}
                key={i.title}
                style={{ height: 80 }}
              >
                {i.content}
              </Item>
            ))}
          </List>
        </Drawer>
        <Affix>
          <Button
            className={styles['btn-affix']}
            type="primary"
            shape="circle"
            onClick={() => console.log('add')}
          >
            <Icon type="file-add" />
          </Button>
        </Affix>
      </>
    );
  }
}

export default Home;
