import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import Progress from '../../component/Progress';
import Contextmenu from '../../component/Contextmenu';
import { list as iconList } from '../../component/Icon';


export default class Todo extends Component {
  static typeName = 'todo';
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo.list,
      displayDestoryList: false,
      addTask: false,
      editTask: false, // 存放编辑序号
      visibleRightMenu: false,
      value: '',
      list: [],
      inputFocus: false, // 任务列表，是否在编辑状态
      rightMenuOption: [],
      color: ['#fa88a1', '#ffef62', '#e7f4a1', '#b0dffa', '#cdc5f4'],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.todo !== this.props.todo) {
      this.setState({ todo: nextProps.todo });
    }
  }
  onClickItem(item, idx) {
    const { storage, todo } = this.props;
    this.setState({
      list: item.list,
    }, () => {
      todo.active = idx;
      storage.set({ todo });
    });
  }
  onChangeInput(e) {
    this.setState({ value: e.target.value });
  }
  onKeyPressInput(e) {
    const keyCode = e.keyCode || e.which || e.charCode;
    if (keyCode !== 13 || !this.state.value) return;
    const { storage, todo } = this.props;
    const itemCurrent = {
      id: new Date().getTime(), // TODO ID
      task: this.state.value, // 任务描述
      complete: false, // 完成状态
      comment: '', // 注释
      star: false, // 是否收藏
    };

    todo.list.forEach((item, idx) => {
      if (idx === todo.active) item.list.unshift(itemCurrent);
    });
    this.setState({ value: '' }, () => {
      storage.set({ todo });
    });
  }
  onRemoveTodoItem(curentItem) {
    const { storage, todo } = this.props;
    todo.list[todo.active].list = todo.list[todo.active].list.filter(item => item.id !== curentItem.id);
    storage.set({ todo });
  }
  onToggleChecked(item) {
    const { storage, todo } = this.props;
    item.complete = !item.complete;
    storage.set({ todo });
  }
  onDisplayDestroyList() {
    const { displayDestoryList } = this.state;
    this.setState({ displayDestoryList: !displayDestoryList });
  }
  onTask(item, e) {
    if (item.complete === true) return;
    e.target.contentEditable = true;
    e.target.focus();
    this.setState({ inputFocus: true });
  }
  onTaskBlur(item, e) {
    const { storage, todo } = this.props;
    e.target.contentEditable = false;
    item.task = e.target.innerText;
    storage.set({ todo });
    this.setState({
      inputFocus: false,
    });
  }
  onKeyPressTask(item, e) {
    const keyCode = e.keyCode || e.which || e.charCode;
    if (keyCode === 13) {
      e.preventDefault();
      e.target.contentEditable = false;
    }
  }
  onContextMenu(idx) {
    this.taskIndex = idx;
    this.setState({
      rightMenuOption: [
        { label: '创建任务清单' },
        { label: '重命名清单' },
        { label: '删除清单' },
      ],
    });
  }
  onClickOutside() {
    this.setState({
      rightMenuOption: [],
    });
  }
  // 菜单右键事件，处理
  onRightMenuClick(item) {
    const { storage, todo } = this.props;
    if (item.label === '创建任务清单') {
      this.setState({ addTask: true }, () => {
        this.addTask.focus();
      });
    } else if (item.label === '删除清单') {
      todo.list.splice(this.taskIndex, 1);
      todo.active = this.taskIndex === 0 && todo.list.length > 0 ? 0 : this.taskIndex - 1;
      storage.set({ todo });
    } else if (item.label === '重命名清单') {
      this.setState({ editTask: this.taskIndex }, () => {
        this.editTask.contentEditable = true;
        todo.active = this.taskIndex;
        this.editTask.focus();
        storage.set({ todo });
      });
    }
  }
  // 菜单编辑 Enter 键处理
  onKeyPressEditTaskMenu(item, idx, e) {
    const { storage, todo } = this.props;
    const keyCode = e.keyCode || e.which || e.charCode;
    if (keyCode !== 13) return;
    e.preventDefault();
    item.label = e.target.innerText;
    storage.set({ todo });
    this.setState({ editTask: false });
  }
  onEditTaskBlur(item, idx, e) {
    const { storage, todo } = this.props;
    item.label = e.target.innerText;
    storage.set({ todo });
    this.setState({ editTask: false });
  }
  onKeyPressAddTask(e) {
    const keyCode = e.keyCode || e.which || e.charCode;
    if (keyCode !== 13) return;
    e.preventDefault();
    e.target.contentEditable = false;
    const value = e.target.innerText;
    const { storage, todo } = this.props;
    if (value) {
      todo.list.push({ label: value, list: [] });
      if (todo.list.length === 1) {
        todo.active = 0;
      } else {
        todo.active = todo.list.length - 1;
      }
      storage.set({ todo });
      this.setState({ addTask: false });
    }
  }
  renderItemTodo(item, idx) {
    return (
      <div
        key={idx}
        className={classNames(styles.item, { del: item.complete === true })}
      >
        <input className={styles.toggle} readOnly checked={item.complete} onClick={this.onToggleChecked.bind(this, item, idx)} type="checkbox" />
        <label
          className={styles.task}
          onClick={this.onTask.bind(this, item)}
          onKeyPress={this.onKeyPressTask.bind(this, item)}
          onBlur={this.onTaskBlur.bind(this, item)}
        >
          {item.task}
        </label>
        <button className={styles.destroy} onClick={this.onRemoveTodoItem.bind(this, item, idx)} />
      </div>
    );
  }
  renderMenuTask(item, idx) {
    const { todo } = this.props;
    const { editTask } = this.state;
    const undone = item.list ? item.list.filter(child => child.complete === false) : [];
    return (
      <div
        key={idx}
        className={classNames(styles.item, { active: todo.active === idx })}
        onContextMenu={this.onContextMenu.bind(this, idx)}
        onClick={this.onClickItem.bind(this, item, idx)}
      >
        <div className={styles.title}>
          {editTask === idx && (
            <div
              ref={node => this.editTask = node}
              onBlur={this.onEditTaskBlur.bind(this, item, idx)}
              onKeyPress={this.onKeyPressEditTaskMenu.bind(this, item, idx)}
              className={styles.editMenu}
            >
              {item.label}
            </div>
          )}
          {editTask !== idx && iconList}
          {editTask !== idx && <span className={styles.innerText}>{item.label}</span>}
        </div>
        {editTask !== idx && <span className={styles.count}>{undone.length > 0 ? undone.length : ''}</span>}
      </div>
    );
  }
  render() {
    const { todo } = this.props;
    const { displayDestoryList, color, inputFocus, rightMenuOption, addTask } = this.state;
    const listTodo = todo.list.filter((_, idx) => idx === todo.active)[0] || {};
    const list = listTodo.list || [];
    const unDoneList = list.filter(item => item.complete === false);
    const doneList = list.filter(item => item.complete === true);
    const percent = list.length === 0 ? 0 : (doneList.length / list.length) * 100;
    return (
      <div className={styles.warpper}>
        <Contextmenu option={rightMenuOption} onClickOutside={this.onClickOutside.bind(this)} onClick={this.onRightMenuClick.bind(this)} />
        <div className={styles.menus}>
          {todo.list.map((item, idx) => this.renderMenuTask(item, idx))}
          {(addTask || todo.list.length === 0) && (
            <div ref={node => this.addTask = node} placeholder="请添加一个任务清单！" onKeyPress={this.onKeyPressAddTask.bind(this)} className={styles.addTask} />
          )}
        </div>
        {todo.list.length > 0 && (
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>{listTodo.label}</h1>
              <div className={styles.color}>
                {inputFocus && color.map((item, idx) => (
                  <span key={idx} style={{ backgroundColor: item }} />
                ))}
              </div>
            </div>
            <div className={styles.progress}>
              <Progress percent={percent} style={{ height: 3, marginBottom: 10, width: 100 }} />
              <label className={styles.percent}>完成 {percent.toFixed(0)}%</label>
            </div>
            <div className={styles.input}>
              <input value={this.state.value} onChange={this.onChangeInput.bind(this)} onKeyPress={this.onKeyPressInput.bind(this)} placeholder="请添加一个任务..." />
            </div>
            {unDoneList.map((item, idx) => this.renderItemTodo(item, idx))}
            {doneList.length > 0 ? <div className={styles.destroyTitle} onClick={this.onDisplayDestroyList.bind(this)}>{`${doneList.length} 个任务已完成`}</div> : null}
            {displayDestoryList && doneList.map((item, idx) => this.renderItemTodo(item, idx))}
          </div>
        )}
      </div>
    );
  }
}
