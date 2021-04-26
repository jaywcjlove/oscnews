import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import addIcon from '../../assets/add-icon.png';
import websiteIcon from '../../assets/website.svg';
import website from '../../source/website.json';
import Edit from './Edit';
// import Contextmenu from "../../component/Contextmenu";

export default class Navigation extends Component {
  static typeName = 'navigation'
  constructor(props) {
    super(props);
    this.state = {
      navContent: props.dbs.nav,
      optionDown: false,
      styleItem: {},
      // navContent: [
      //   {
      //     label: '500px',
      //     value: 'https://500px.com/',
      //     icon: 'https://jaywcjlove.github.io/logo/500px.png',
      //   },
      // ],
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClickOption = this.handleClickOption.bind(this);
    this.handleClickOptionUp = this.handleClickOptionUp.bind(this);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClickOption, true);
    document.removeEventListener('keyup', this.handleClickOptionUp, true);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize, true);
    document.addEventListener('keydown', this.handleClickOption, true);
    document.addEventListener('keyup', this.handleClickOptionUp, true);
    const { navContent } = this.state;
    const { storage, dbs } = this.props;
    if (navContent.length === 0) {
      for (let i = 0; i < website.length; i += 1) {
        if (website[i].children && website[i].children[0]) {
          navContent.push(website[i].children[0]);
          dbs.nav = navContent;
          storage.set({ dbs });
          this.setState({ navContent });
        }
      }
    }
  }
  handleClickOption(e) {
    const key = e.keyCode || e.which || e.charCode;
    if (e.key === 'Alt' || key === 18) {
      this.setState({ optionDown: true });
    }
  }
  handleClickOptionUp(e) {
    const key = e.keyCode || e.which || e.charCode;
    if (e.key === 'Alt' || key === 18) {
      this.setState({ optionDown: false });
    }
  }
  handleResize() {
    if (this.navContent) {
      this.resizeContent(this.navContent);
    }
  }
  resizeContent(node) {
    if (!node) return;
    this.navContent = node;
    let width = document.body.clientWidth;
    width -= 100;
    if (width > 1024) width = 1024;
    if (width < 660) width = 660;
    const subWidth = width / 6;
    let paddingHorizontal = (subWidth - 90) / 2;
    if (paddingHorizontal < 20) paddingHorizontal = 20;
    node.style.maxHeight = '504px';
    node.style.width = `${width}px`;
    const child = node.children;
    for (let i = 0; i < child.length; i += 1) {
      if (child[i]) {
        child[i].style.width = `${subWidth}px`;
        child[i].style.paddingLeft = `${paddingHorizontal}px`;
        child[i].style.paddingRight = `${paddingHorizontal}px`;
        const img = child[i].getElementsByTagName('img');
        if (img && img.length > 0) {
          img[0].style.height = `${img[0].clientWidth}px`;
        }
      }
    }
  }
  onClickAdd(item) {
    const { navContent } = this.state;
    const { storage, dbs } = this.props;
    const itemfilter = navContent.filter(editItem => editItem.value === item.value);
    if (itemfilter.length > 0) return;

    navContent.push(item);
    dbs.nav = navContent;
    storage.set({ dbs });
    this.setState({ navContent });
  }
  onShowEdit = () => {
    this.edit.onShowEdit();
  }
  onKeyDownOption(item) {
    const { storage, dbs } = this.props;
    const { navContent } = this.state;
    const itemfilter = navContent.filter(editItem => editItem.value !== item.value);
    dbs.nav = itemfilter;
    storage.set({ dbs });
    this.setState({ navContent: itemfilter });
  }
  onContextMenu(e) {
    e.preventDefault();
    const optionDown = !this.state.optionDown;
    this.setState({ optionDown });
    return false;
  }
  onClickContextMenu(e) {
    const { optionDown } = this.state;
    if (optionDown) {
      e.preventDefault();
    }
    this.setState({ optionDown: false });
  }
  onDragOver(e) {
    this.DragOverElm = e.target;
  }
  onDragStart(e) {
    this.parentElm = e.target.parentNode;
    e.target.classList.add('is-drod');
  }
  onDragEnd(e) {
    const { navContent } = this.state;
    const { storage, dbs } = this.props;
    const child = this.parentElm.children;
    e.target.classList.remove('is-drod');
    let overIndex = null;
    let currentIndex = null;
    for (let i = 0; i < child.length; i += 1) {
      if (child[i] === this.DragOverElm) overIndex = i;
      if (child[i] === e.target) currentIndex = i;
    }
    if (currentIndex > -1 && overIndex > -1) {
      const curData = navContent[currentIndex];
      if (currentIndex > overIndex) {
        // this.parentElm.insertBefore(e.target, this.DragOverElm);
        navContent.splice(currentIndex, 1);
        navContent.splice(overIndex, 0, curData);
      }
      if (currentIndex < overIndex) {
        // this.parentElm.insertBefore(e.target, this.DragOverElm.nextSibling);
        navContent.splice(overIndex + 1 >= child.length ? overIndex : overIndex + 1, 0, curData);
        navContent.splice(currentIndex, 1);
      }
      dbs.nav = navContent;
      storage.set({ dbs });
    }
    currentIndex = null;
    overIndex = null;
  }
  render() {
    const { navContent, optionDown } = this.state;
    return (
      <div className={styles.nav} onClick={this.onClickContextMenu.bind(this)}>
        <div className={styles.navBox}>
          <div className={styles.navContent} ref={this.resizeContent.bind(this)}>
            {navContent.map((item, idx) => {
              const propsChild = {
                key: idx,
                target: '_top',
                draggable: true,
                className: classNames({
                  doc: item.type === 'doc',
                }),
                onContextMenu: this.onContextMenu.bind(this),
                onDragStart: this.onDragStart.bind(this),
                onDragEnd: this.onDragEnd.bind(this),
                onDragOver: this.onDragOver.bind(this),
              };
              const child = (
                <span>
                  <img alt={item.label} onError={e => e.target.src = websiteIcon} src={item.icon} />
                  <p>{item.label}</p>
                  {optionDown && <i onClick={this.onKeyDownOption.bind(this, item)} className={styles.keyDown} />}
                </span>
              );
              propsChild.href = optionDown ? '#' : item.value;
              return (
                <a {...propsChild}> {child} </a>
              );
            })}
            {navContent.length < 18 && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a className={styles.addIcon} onClick={this.onShowEdit.bind(this)}>
                <img alt="" src={addIcon} />
              </a>
            )}
          </div>
        </div>
        <Edit ref={comp => this.edit = comp } onClickAdd={this.onClickAdd.bind(this)} />
      </div>
    );
  }
}
