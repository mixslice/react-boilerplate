import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Counter } from 'components';
import { CounterActions } from 'actions';


const CounterApp = (props) => {
  const { counter, actions } = props;
  return (
    <Counter counter={counter} {...actions} />
  );
};

CounterApp.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object,
};

const mapStateToProps = state => ({
  counter: state.counter,
});

export default connect(
  mapStateToProps,
  dispatch => ({
    actions: bindActionCreators(CounterActions, dispatch),
  })
)(CounterApp);
