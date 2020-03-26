import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defaultNavOptions } from '../navigation';
import * as colors from '../stylesheets/colors';
import { STOP } from '../stylesheets/colors';
import { navigate } from '../navigation/service';
import ButtonEDS from '../components/common/EDS/Button';
import { appStartupInit } from '../store/test/actions';
import { selectError } from '../store/test/reducer';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
});

class DefaultPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...defaultNavOptions,
    headerRight: (
      <TouchableOpacity
        testID="ButtonSettings"
        onPress={() => navigation.navigate('SettingsRoute')}
        style={{ paddingLeft: 15, paddingRight: 15 }}
      >
        <Icon name="md-cog" color={colors.EQUINOR_GREEN} size={24} />
      </TouchableOpacity>
    ),
    headerLeft: null,
  });

  static propTypes = {
    actionAppInit: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actionAppInit();
  }

  render() {
    const { error } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {error && error.status && (
          <TouchableHighlight
            style={{ backgroundColor: STOP, padding: 12, margin: 0 }}
            onPress={() =>
              Linking.openURL(
                `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`
              )
            }
          >
            <>
              <Text style={{ color: 'white' }}>Could not init the app due to</Text>
              <Text style={{ fontSize: 23, color: 'white', marginVertical: 4 }}>
                ERROR: {error.status} {error.message && `| ${error.message}`}
              </Text>
              <Text style={{ color: 'white' }}>Click to learn more...</Text>
            </>
          </TouchableHighlight>
        )}
        <View style={styles.component}>
          <Text
            style={{
              color: '#243746',
              fontSize: 15,
              paddingTop: 65,
              paddingBottom: 65,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Velkommen til din hørselsmonitorering
          </Text>
          <ButtonEDS onPress={() => navigate('PreTestRoute')} text="Ta hørselstesten" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: selectError(state),
});
const mapDispatchToProps = dispatch => ({
  actionAppInit: () => dispatch(appStartupInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
