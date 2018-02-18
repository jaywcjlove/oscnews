import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Edit.less';
import website from '../../source/website.json';
import addIcon from '../../assets/add-icon.png';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      active: '',
      edit: {
        label: '添加网址',
        value: '',
        icon: addIcon,
      },
    };
  }
  componentDidMount() {
    this.setListData();
    this.onHideEdit();
  }
  setListData(type) {
    let list = [];
    for (let i = 0; i < website.length; i += 1) {
      if (type) {
        if (website[i].value === type) {
          list = website[i].children;
          break;
        }
      } else if (website[i].children && website[i].children.length > 0) {
        list = website[i].children;
        break;
      }
    }
    this.setState({ list });
  }
  onClickTab(type) {
    this.setListData(type);
    this.setState({ active: type });
  }
  onClickAdd(edit) {
    const { onClickAdd } = this.props;
    if (!edit.value) return;
    this.onHideEdit();
    onClickAdd && onClickAdd(edit);
  }
  handleAddNav(edit) {
    const { onClickGrid } = this.props;
    this.setState({ edit }, () => {
      onClickGrid && onClickGrid(edit);
    });
  }
  onShowEdit() {
    this.warpper.style.marginBottom = '0px';
  }
  onHideEdit() {
    this.warpper.style.marginBottom = `-${this.warpper.clientHeight}px`;
  }
  onChangeEdit(e) {
    const { edit } = this.state;
    edit.icon = '';
    edit.value = e.target.value;
    edit.label = e.target.value;
    this.setState({ edit });
  }
  render() {
    const { list, active, edit } = this.state;
    return (
      <div className={styles.navEdit} ref={node => this.warpper = node}>
        <div className={styles.edit}>
          <img alt="" src={edit.icon} />
          <span className={styles.title}>{edit.label}</span>
          <input className={styles.url} onChange={this.onChangeEdit.bind(this)} value={edit.value} type="text" placeholder="输入网址" />
          <button className={styles.save} onClick={this.onClickAdd.bind(this, edit)}>确定</button>
        </div>
        <div className={styles.editTabList}>
          <div className={styles.category}>
            {website.map((item, idx) => {
              let isActive = item.value === active;
              if (active === '' && idx === 0) isActive = true;
              return (
                <span key={idx} onClick={this.onClickTab.bind(this, item.value)} className={classNames({ active: isActive })}>
                  {item.label}
                </span>
              );
            })}
          </div>
          <div className={styles.list}>
            {list.map((item, idx) => {
              return (
                <span key={idx} onClick={this.handleAddNav.bind(this, item)}>
                  <img alt={item.label} src={item.icon} />
                  <p>{item.label}</p>
                </span>
              );
            })}
          </div>
        </div>
        <div className={styles.closeBtn} onClick={this.onHideEdit.bind(this)} />
      </div>
    );
  }
}
