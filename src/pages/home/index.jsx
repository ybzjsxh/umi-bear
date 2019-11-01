import React from 'react';
import { List, Icon } from 'antd-mobile';
import { Affix, Button } from 'antd';

import styles from './index.less';

const Item = List.Item;

export default class ListExample extends React.Component {
  state = {
    disabled: false,
    content: [
      { title: '1', content: '312123123' },
      { title: '2', content: '312123123' },
      { title: '3', content: '312123123' },
    ],
  };

  render() {
    return (
      <>
        <List renderHeader={() => 'Text Wrapping'} className="my-list">
          {this.state.content.map((i, index) => (
            <Item
              arrow="horizontal"
              onClick={() => console.log(index)}
              key={i.title}
              style={{ height: 80 }}
            >
              {i.content}
            </Item>
          ))}
        </List>
        <Affix>
          <Button
            className={styles['btn-affix']}
            type="primary"
            shape="circle"
            onClick={() => console.log('add')}
          >
            <Icon type='search' />+
          </Button>
        </Affix>
      </>
    );
  }
}
