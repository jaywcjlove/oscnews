import React, { Component } from 'react';
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
  render() {
    const { showSearch, className, ...resetProps } = this.props;
    const { visible, value, option } = this.state;
    const title = this.props.option.filter(item => item.value === value);
    delete resetProps.option;
    delete resetProps.onSelect;
    return (
      <div
        className={classNames(styles.select, className, {
          visible, hide: !visible,
        })}
        {...resetProps}
      >
        <div className={styles.title} onClick={this.onClick.bind(this)}>
          {title && title.length > 0 && title[0].label}
        </div>
        <div className={styles.option} >
          {showSearch && (
            <div className={styles.search}>
              <input type="text" placeholder="过滤语言" onChange={this.onFilterLang.bind(this)} />
            </div>
          )}
          <div className={styles.optionList}>
            {option.map((item, idx) => {
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
            })}
          </div>
        </div>
      </div>
    );
  }
}

Select.propsTypes = {
  value: PropTypes.string,
  option: PropTypes.array,
  showSearch: PropTypes.bool,
  onSelect: PropTypes.func,
};

Select.defaultProps = {
  option: [],
  value: '',
  showSearch: false,
  onSelect() {},
};
