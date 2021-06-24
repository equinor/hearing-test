import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ImageModal from 'react-native-image-modal';
import { defaultNavOptions } from '../navigation';
import Spinner from '../components/common/atoms/Spinner';
import { fetchTests } from '../store/tests/actions';
import { selectTests } from '../store/tests';
import { selectIsFetchingTests } from '../store/tests/reducer';
import { EQUINOR_GREEN } from '../stylesheets/colors';
import ButtonEDS from '../components/common/EDS/Button';
import NavigationItem from '../components/common/atoms/NavigationItem';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

class TestLogPage extends Component {
  static navigationOptions = () => ({
    ...defaultNavOptions,
  });

  static propTypes = { fetching: PropTypes.bool.isRequired, tests: PropTypes.array.isRequired };

  state = {
    selectedTest: { name: '', dateTaken: null, id: '', userId: '', audiogram: '' },
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showTest(selectedTest) {
    this.setState({ selectedTest }, () => {
      this.setModalVisible(true);
    });
  }

  render() {
    if (this.props.fetching) {
      return (
        <View style={styles.component}>
          <Spinner />
        </View>
      );
    }
    if (this.props.tests.length < 1)
      return (
        <View style={styles.component}>
          <Text>Du har ikke fullført noen tester. Gå tilbake og ta en hørselstest.</Text>
        </View>
      );
    return (
      <SafeAreaView style={styles.component}>
        <FlatList
          style={{paddingTop:32, paddingHorizontal:24}}
          data={this.props.tests.sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken))}
          keyExtractor={item => item.id}
          renderItem={e => {
            const { item } = e;
            return (
              <NavigationItem title={new Date(item.dateTaken).toLocaleDateString('nb-NO')} onPress={() => this.showTest(item)} />
            );
          }}
        />
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <View style={{ flex: 1, paddingTop: 22, backgroundColor: 'white' }}>
            <SafeAreaView>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 4,
                  marginTop: 40,
                  marginBottom: 20,
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <ImageModal
                    resizeMode="contain"
                    imageBackgroundColor="#ffffff"
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').width * 0.8,
                    }}
                    source={{
                      uri: this.state.selectedTest.audiogram,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#243746',
                    fontSize: 15,
                    paddingHorizontal: 12,
                    paddingTop: 16,
                    paddingBottom: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {this.state.selectedTest.name}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    color: '#243746',
                    fontSize: 16,
                    lineHeight: 24,
                    paddingBottom: 32,
                    fontWeight: 'normal',
                  }}
                >
                  {new Date(this.state.selectedTest.dateTaken).toLocaleString('nb-NO')}
                </Text>
              </View>
              <View style={{ padding: 22 }}>
                <ButtonEDS onPress={() => this.setModalVisible(false)} text="OK" />
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  tests: selectTests(state),
  fetching: selectIsFetchingTests(state),
});

const mapDispatchToProps = dispatch => ({
  fetchTests: dispatch(fetchTests()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestLogPage);
