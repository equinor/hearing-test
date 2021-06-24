import React, { Component } from 'react';
import {
  Linking,
  Modal,
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
import Typography from '../components/common/atoms/Typography';
import { NavigationList } from '../components/common';
import Card from '../components/common/atoms/Card';
import NavigationItem from '../components/common/atoms/NavigationItem';
import { fetchMe } from '../services/api/api-methods';
import TestLogPage from './TestLogPage';

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: colors.GRAY_BACKGROUND,
    padding: 24,
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

  state = {
    firstName: null,
    testLogPageVisible: false
  }

  

  componentDidMount() {
    this.props.actionAppInit();
    fetchMe().then(response => this.setState({firstName:response.firstName}))
  }

  render() {
    const { error } = this.props;
    if (!this.state.firstName) return <></>
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
          <Typography variant="h1" style={{paddingLeft: 4, paddingBottom:32}}>Hei {this.state.firstName},</Typography>
          <Card>
            <Typography variant="h2" style={{paddingBottom: 16}}>Er du klar for en ny test?</Typography>
            <Typography variant="p" style={{paddingBottom: 32}}>{"Husk å teste hørselen din regelmessig for at vi skal kunne kartlegge hørselshelsen din over tid."}</Typography>
            <View style={{width:160}}>
              <ButtonEDS onPress={() => navigate('PreTestRoute')} text="Ta hørselstesten" />
            </View>
          </Card>
          <Typography variant="h2" style={{paddingBottom: 16, paddingTop: 32, }}>Din oversikt</Typography>
          <NavigationItem title="Informasjon om testen" />
          <NavigationItem onPress={() => this.setState({testLogPageVisible:true})} title="Mine resultater" />
        </View>
        <Modal animationType="Slide" presentationStyle="overFullScreen" transparent={true} visible={this.state.testLogPageVisible} onDismiss={() => {console.log("Dismissed!");this.setState({testLogPageVisible:false})}}onRequestClose={() => this.setState({testLogPageVisible:false})}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:24, borderBottomWidth:1, borderStyle:'solid', borderColor:'#DCDCDC', marginTop:110, backgroundColor:'white', borderTopRightRadius:12, borderTopLeftRadius:12,shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,  
        elevation: 5,}}>
            <Typography variant="p">i</Typography>
            <Typography variant="h1">Din hørsel</Typography>
            <TouchableOpacity onPress={() => this.setState({testLogPageVisible:false})}>
              <Typography variant="p">x</Typography>
            </TouchableOpacity>
          </View>
          <TestLogPage />
        </Modal>
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
