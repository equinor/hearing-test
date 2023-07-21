import { Spinner } from "mad-expo-core";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import NavigationItem from "../components/common/atoms/NavigationItem";
import { fetchTests } from "../store/tests/actions";
import { selectTests, selectIsFetchingTests } from "../store/tests/reducer";
import { TestResult } from "../types";
import { formatDate } from "../utils/date";

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: "white",
  },
});

class TestLogScreen extends Component<{
  setSelectedItem: Function;
  fetching: boolean;
  tests: [];
}> {
  showTest(selectedTest: TestResult) {
    this.props.setSelectedItem(selectedTest);
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
          <Text>
            Du har ikke fullført noen tester. Gå tilbake og ta en hørselstest.
          </Text>
        </View>
      );
    return (
      <View style={styles.component}>
        <FlatList
          style={{ paddingTop: 32, paddingHorizontal: 24 }}
          data={this.props.tests.sort(
            (a: TestResult, b: TestResult) =>
              new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
          )}
          keyExtractor={(item: TestResult) => item.id}
          renderItem={(e) => {
            const { item } = e;
            return (
              <NavigationItem
                title={formatDate(item.dateTaken)}
                onPress={() => this.showTest(item)}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  tests: selectTests(state),
  fetching: selectIsFetchingTests(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTests: dispatch(fetchTests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestLogScreen);
