import { View } from "react-native";
import { connect } from "react-redux";

import { selectIsFetching } from "../../../store/test";
import { postTest } from "../../../store/test/actions";
import { getUnsentTests } from "../../../store/unsent-tests/reducer";
import { RootStackScreenProps } from "../../../types";
import ButtonEDS from "../EDS/Button";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";

type Cards = {
  newTest: CardProps;
  unsentTest: CardProps;
};

type CardProps = {
  title: string;
  description: string;
  onPress: () => void;
  buttonText: string;
  loading?: boolean;
};

interface Props extends RootStackScreenProps<"DefaultRoute"> {
  actionPostTest: Function;
  isFetching: boolean;
  unsentTests: any[];
}

const TestCardComponent = ({
  actionPostTest,
  isFetching,
  navigation,
  unsentTests,
}: Props) => {
  const isMultipleUnsentTests = unsentTests.length > 1;

  const cards: Cards = {
    newTest: {
      title: "Er du klar for en ny test?",
      description:
        "Husk å teste hørselen din regelmessig for at vi skal kunne kartlegge hørselshelsen din over tid.",
      onPress: () => navigation.navigate("PreTestRoute"),
      buttonText: "Ta hørselstesten",
    },
    unsentTest: {
      title: `Du har ${unsentTests.length} ${
        isMultipleUnsentTests ? "usendte tester" : "usendt test"
      }`,
      description: `Du må sende ${
        isMultipleUnsentTests ? "de usendte testene" : "den usendte testen"
      } før du kan starte en ny test.`,
      onPress: () => actionPostTest(unsentTests[0]),
      buttonText: "Send",
      loading: isFetching,
    },
  };

  const card = unsentTests.length === 0 ? cards.newTest : cards.unsentTest;

  return (
    <Card>
      <Typography variant="h2" style={{ paddingBottom: 16 }}>
        {card.title}
      </Typography>
      <Typography variant="p" style={{ paddingBottom: 32 }}>
        {card.description}
      </Typography>
      <View style={{ width: 160 }}>
        <ButtonEDS
          onPress={card.onPress}
          text={card.buttonText}
          loading={card.loading}
        />
      </View>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actionPostTest: (test) => dispatch(postTest(test)),
});

const mapStateToProps = (state) => ({
  isFetching: selectIsFetching(state),
  unsentTests: getUnsentTests(state),
});

export const TestCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestCardComponent);
