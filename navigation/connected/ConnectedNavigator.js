// import PropTypes from 'prop-types';
// import React from 'react';
// import { connect } from 'react-redux';
// import { addNavigationHelpers } from 'react-navigation';
// import AppNavigator from '../AppNavigator';
// import { getNavigation } from './reducer';

// class ConnectedAppdNavigator extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     navigation: PropTypes.object.isRequired,
//   };

//   render() {
//     return (
//       <AppNavigator
//         navigation={addNavigationHelpers({
//           dispatch: this.props.dispatch,
//           state: this.props.navigation,
//         })}
//       />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   navigation: getNavigation(state),
// });

// export default connect(mapStateToProps)(ConnectedAppdNavigator);
