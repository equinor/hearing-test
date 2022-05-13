import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text } from "react-native";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";

import * as actions from "../../store";
import { selectChangeLog, isFetching } from "../../store/changelog";
import { ChangeLog } from "../components/changelog";

class FeaturePage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setVersion: PropTypes.func.isRequired,
    fetchChangelog: PropTypes.func.isRequired,
    releaseNote: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    releaseNote: {},
  };
  /*

  componentWillMount() {
    const version = DeviceInfo.getVersion();
    this.props.fetchChangelog(version);
  }

  componentDidUpdate(prevProps) {
    const { fetching } = this.props;
    if (!fetching && prevProps.fetching && !this.props.releaseNote.changes) {
      // If releaseNotes errored on retrieval, go directly to main.
      this.goToMain();
    }
  }

  goToMain = () => {
    this.props.setVersion(DeviceInfo.getVersion());
    this.props.navigation.navigate("MainRoute");
  };
*/
  render() {
    const { releaseNote, fetching } = this.props;
    return (
      <Text>Testing fra FeaturePage</Text>
      // <ChangeLog
      //   releaseNote={releaseNote}
      //   fetching={fetching}
      //   affirm={() => this.goToMain()}
      // />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setVersion: (version) => dispatch(actions.setVersion(version)),
  fetchChangelog: (version) => dispatch(actions.fetchChangelog(version)),
});

const mapStateToProps = (state) => ({
  releaseNote: selectChangeLog(state),
  fetching: isFetching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturePage);
