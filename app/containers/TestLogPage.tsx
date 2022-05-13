import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { selectTests } from "../../store/tests";
import { fetchTests } from "../../store/tests/actions";
import { selectIsFetchingTests } from "../../store/tests/reducer";
import NavigationItem from "../components/common/atoms/NavigationItem";
import Spinner from "../components/common/atoms/Spinner";
import { defaultNavOptions } from "../navigation";
import { TestResult } from "../types";

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});

class TestLogPage extends Component<{
  setSelectedItem: Function;
  fetching: boolean;
  tests: [];
}> {
  static navigationOptions = () => ({
    ...defaultNavOptions,
  });

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
      <SafeAreaView style={styles.component}>
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
                title={new Date(item.dateTaken).toLocaleDateString("nb-NO")}
                onPress={() => this.showTest(item)}
              />
            );
          }}
        />
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestLogPage);
