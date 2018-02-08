import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: props.option,
      value: props.value,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    const { value, option } = this.state;
    if (!value && option && option.length > 0) {
      this.setState({
        value: option[0].value || '',
      });
    }
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  handleClickOutside(e) {
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target))) {
      this.setState({ visible: false });
    }
  }
  onClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  onSelect(item) {
    const { onSelect } = this.props;
    this.setState({
      value: item.value,
      visible: !this.state.visible,
    }, () => {
      onSelect(item, item.value);
    });
  }
  onFilterLang(e) {
    const { value } = e.target;
    const { option } = this.state;
    const filterData = option.filter(item => item.value.toLowerCase().indexOf(value) > -1);
    this.setState({
      option: value.length > 0 ? filterData : this.props.option,
    });
  }
  renderItems(items, value) {
    return items.map((item, idx) => {
      return (
        <div
          key={idx}
          className={classNames('item', {
            selected: item.value === value,
          })}
          onClick={this.onSelect.bind(this, item)}
        >
          {item.label}
        </div>
      );
    });
  }
  render() {
    const { showSearch, className, suggest, ...resetProps } = this.props;
    const { visible, value, option } = this.state;
    const title = this.props.option.filter(item => item.value === value);
    const suggestItems = this.props.option.filter(item => suggest.includes(item.value));
    delete resetProps.option;
    delete resetProps.onSelect;
    return (
      <div
        className={classNames('select', styles.select, className, {
          visible, hide: !visible,
        })}
        {...resetProps}
      >
        <div className={classNames('title', styles.title)} onClick={this.onClick.bind(this)}>
          {title && title.length > 0 && title[0].label}
        </div>
        <div className={styles.option} >
          {showSearch && (
            <div className={styles.search}>
              <input type="text" placeholder="过滤语言" onChange={this.onFilterLang.bind(this)} />
            </div>
          )}
          <div className={styles.optionList}>
            {this.renderItems(suggestItems, value)}
            {suggestItems.length > 0 && <div className={styles.divider} />}
            {this.renderItems(option, value)}
          </div>
        </div>
      </div>
    );
  }
}

Select.propsTypes = {
  value: PropTypes.string,
  option: PropTypes.array,
  suggest: PropTypes.array,
  showSearch: PropTypes.bool,
  onSelect: PropTypes.func,
};

Select.defaultProps = {
  option: [],
  suggest: [],
  value: '',
  showSearch: false,
  onSelect() {},
};
