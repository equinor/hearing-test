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
//import { PropTypes } from 'prop-types';
import ImageModal from 'react-native-image-modal';
import { defaultNavOptions } from '../navigation';
import Spinner from '../components/common/atoms/Spinner';
import { fetchTests } from '../store/tests/actions';
import { selectTests } from '../store/tests';
import { selectIsFetchingTests } from '../store/tests/reducer';
import { EQUINOR_GREEN } from '../stylesheets/colors';
import ButtonEDS from '../components/common/EDS/Button';
import NavigationItem from '../components/common/atoms/NavigationItem';
import { TestResult } from '../types';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});

class TestLogPage extends Component<{showResults:CallableFunction, fetching?:boolean, tests?:[]}> {
  static navigationOptions = () => ({
    ...defaultNavOptions,
  });

  //static propTypes = { fetching: PropTypes.bool.isRequired, tests: PropTypes.array.isRequired };

  state = {
    selectedTest: { name: '', dateTaken: null, id: '', userId: '', audiogram: '' },
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showTest(selectedTest:TestResult) {
    this.props.showResults(selectedTest);
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
          data={this.props.tests.sort((a:TestResult, b:TestResult) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime())}
          keyExtractor={(item:TestResult) => item.id}
          renderItem={e => {
            const { item } = e;
            return (
              <NavigationItem title={new Date((item as TestResult).dateTaken).toLocaleDateString('nb-NO')} onPress={() => this.showTest(item)} />
            );
          }}
        />
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
