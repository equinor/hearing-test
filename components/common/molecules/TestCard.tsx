import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { connect, useSelector } from "react-redux";

import { postTest } from "../../../store/test/actions";
import { selectIsFetching } from "../../../store/test/reducer";
import { getUnsentTests } from "../../../store/unsent-tests/reducer";
import { RootStackParamList } from "../../../types";
import ButtonEDS from "../EDS/Button";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";

type Cards = {
  newTest: CardProps;
  offline: CardProps;
  unsentTest: CardProps;
};

type CardProps = {
  title: string;
  description: string;
  buttonText?: string;
  onPress?: () => void;
  loading?: boolean;
};

type TestCardProps = {
  actionPostTest: Function;
  isConnected: boolean | null;
  navigation?: NativeStackNavigationProp<RootStackParamList, "DefaultRoute">;
};

const TestCardComponent = ({
  actionPostTest,
  isConnected,
  navigation,
}: TestCardProps) => {
  const isFetching = useSelector((state) => selectIsFetching(state));
  const unsentTests = useSelector((state) => getUnsentTests(state));
  const isMultipleUnsentTests = unsentTests.length > 1;

  const cards: Cards = {
    newTest: {
      title: "Er du klar for en ny test?",
      description:
        "Husk å teste hørselen din regelmessig for at vi skal kunne kartlegge hørselshelsen din over tid.",
      buttonText: "Ta hørselstesten",
      onPress: () => navigation?.navigate("PreTestRoute"),
    },
    offline: {
      title: "Ingen nettverk",
      description:
        "Du trenger nettverkstilgang for å ta en test. Koble til Wi-Fi eller mobilnett og prøv igjen.",
    },
    unsentTest: {
      title: `Du har ${unsentTests.length} ${
        isMultipleUnsentTests ? "usendte tester" : "usendt test"
      }`,
      description: `Du må sende ${
        isMultipleUnsentTests ? "de usendte testene" : "den usendte testen"
      } før du kan starte en ny test.`,
      buttonText: "Send",
      onPress: () => actionPostTest(unsentTests[0]),
      loading: isFetching,
    },
  };

  let card: CardProps;

  if (!isConnected) {
    card = cards.offline;
  } else {
    card = unsentTests.length > 0 ? cards.unsentTest : cards.newTest;
  }

  return (
    <Card>
      <Typography variant="h2" style={{ paddingBottom: 16 }}>
        {card.title}
      </Typography>
      <Typography variant="p" style={{ paddingBottom: 32 }}>
        {card.description}
      </Typography>
      {card.buttonText && card.onPress ? (
        <View style={{ width: 160 }}>
          <ButtonEDS
            text={card.buttonText}
            onPress={card.onPress}
            loading={card.loading}
          />
        </View>
      ) : null}
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actionPostTest: (test) => dispatch(postTest(test)),
});

export const TestCard = connect(null, mapDispatchToProps)(TestCardComponent);
