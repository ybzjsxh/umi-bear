import React from 'react';
import {
  NavBar,
  Drawer,
  List,
  Toast,
  SwipeAction,
  Modal,
  PullToRefresh,
  SearchBar,
} from 'antd-mobile';
import { Affix, Button, Icon } from 'antd';
import router from 'umi/router';
import dayjs from 'dayjs';

import styles from './index.less';
import { connect } from 'dva';

const Item = List.Item;

@connect(({ loading, article }) => ({
  loading: loading.global,
  article,
}))
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docked: false,
      search: false,
      articleList: [],
      filterText: '',
      focused: false,
      height: document.documentElement.clientHeight,
    };
  }

  async componentDidMount() {
    Toast.loading('加载中', 0, null, true);
    const { dispatch } = this.props;

    new Promise(resolve => {
      dispatch({
        type: 'article/queryArticle',
        payload: {
          resolve,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        Toast.hide();
        this.setState({
          loading: false,
          articleList: res.data.list,
        });
        // localStorage.setItem('content', JSON.stringify(res.data.list));
      } else {
        Toast.fail(`${res.message}`, 3, null, true);
      }
    });
  }

  handleStateChange = state => {
    state === 'docked'
      ? this.setState({ docked: !this.state.docked })
      : this.setState({ search: !this.state.search });
  };

  handleFilter = content => {
    let new_list = this.props.article.articleList.filter(
      i => i.title === content,
    );
    if (!!new_list && new_list.length !== 0) {
      this.setState({ articleList: new_list, filterText: content });
    }
  };

  handleSearchCancel = () => {
    this.setState(prevState => ({ filterText: '', search: !prevState.search }));
    if (!!this.state.filterText) {
      this.componentDidMount();
    }
  };

  handleAlert = id => {
    const alert = Modal.alert;
    alert('删除', '确定吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => this.handleDelete(id) },
    ]);
  };

  handleDelete = id => {
    Toast.loading('删除中', 0, null, true);
    const { dispatch } = this.props;
    new Promise(resolve => {
      dispatch({
        type: 'article/delArticle',
        payload: {
          resolve,
          params: { id },
        },
      });
    }).then(res => {
      if (res.code === 0) {
        Toast.hide();
      } else {
        Toast.fail('删除失败', 3, null, true);
      }
    });
  };

  handleRefresh = () => {
    const { dispatch } = this.props;
    new Promise(resolve => {
      dispatch({
        type: 'article/queryArticle',
        payload: { resolve },
      });
    }).then(res => {
      if (res.code === 0) {
        console.log('refreshed');
      }
    });
  };

  handleAdd = () => {
    router.push(`/article?id=`);
  };

  render() {
    const { articleList, search, docked, height, focused } = this.state;
    const sidebar = (
      <List>
        {[0, 1, 2, 3, 4].map((i, index) => {
          if (index === 0) {
            return (
              <Item
                key={index}
                thumb=""
                multipleLine
                style={{ background: '#fff' }}
              >
                笔记本
              </Item>
            );
          }
          return (
            <Item key={index} thumb="" arrow="horizontal">
              笔记本{index}
            </Item>
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
          icon={<Icon type={docked ? 'left' : 'right'} />}
          onLeftClick={() => this.handleStateChange('docked')}
          rightContent={
            search ? (
              <SearchBar
                placeholder="搜索标题"
                onCancel={() => this.handleSearchCancel()}
                onChange={e => this.handleFilter(e)}
                onClear={() => this.componentDidMount()}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
                style={{ width: 200 }}
              />
            ) : (
              <Icon
                type="search"
                style={{ marginRight: 16 }}
                onClick={() => this.handleStateChange('search')}
              />
            )
          }
        >
          {window.location.pathname.replace('/', '')}
        </NavBar>
        <Drawer
          className={styles['my-drawer']}
          style={{
            minHeight: document.documentElement.clientHeight,
          }}
          contentStyle={{
            color: '#A6A6A6',
            textAlign: 'center',
            opacity: focused ? 0.3 : 1,
            transition:
              'opacity 0.3s ease-out, left 0.3s ease-out, right 0.3s ease-out',
          }} // left right为了兼容侧边栏的渐变
          sidebarStyle={{ border: '1px solid #ddd', marginTop: 45 }}
          sidebar={sidebar}
          docked={docked}
          onOpenChange={this.handleLeftClick}
        >
          <PullToRefresh
            damping={60}
            ref={el => (this.ptr = el)}
            style={{
              height,
              overflow: 'auto',
              marginTop: 45,
            }}
            indicator={{ deactivate: '上拉可以刷新' }}
            refreshing={this.props.loading}
            onRefresh={this.handleRefresh}
          >
            <List
              className={styles['my-list']}
              loading={{
                spinning: this.props.loading,
                indicator: <Icon type="loading" />,
                size: 'large',
                tip: '正在加载数据...',
              }}
            >
              {articleList &&
                articleList.map((i, index) => (
                  <SwipeAction
                    autoClose
                    right={[
                      {
                        text: '删除',
                        onPress: () => this.handleAlert(i._id),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    key={i._id}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <Item
                      key={i._id}
                      arrow="horizontal"
                      onClick={() => router.push(`/article?id=${i._id}`)}
                      style={{ height: 80 }}
                      extra={`${dayjs(i.create_time).format('YY.M.DD HH:mm')}`}
                    >
                      {i.title}
                    </Item>
                  </SwipeAction>
                ))}
            </List>
          </PullToRefresh>
        </Drawer>
        <Affix>
          <Button
            className={styles['btn-affix']}
            type="primary"
            shape="circle"
            onClick={this.handleAdd}
          >
            <Icon type="file-add" />
          </Button>
        </Affix>
      </>
    );
  }
}

export default Home;
