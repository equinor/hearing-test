import { Button, Typography } from "@equinor/mad-components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { postTest } from "../../../store/test/actions";
import { selectIsFetching } from "../../../store/test/reducer";
import { getUnsentTests } from "../../../store/unsent-tests/reducer";
import { RootStackParamList } from "../../../types";
import { Card } from "../atoms/Card";

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
  isConnected: boolean | null;
  navigation?: NativeStackNavigationProp<RootStackParamList, "Root">;
};

export const TestCard = ({ isConnected, navigation }: TestCardProps) => {
  const isFetching = useSelector(selectIsFetching);
  const unsentTests = useSelector(getUnsentTests);
  const isMultipleUnsentTests = unsentTests.length > 1;
  const dispatch = useDispatch();

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
      onPress: () => {
        dispatch(postTest(unsentTests[0]));
        navigation?.navigate("TestResultRoute");
      },
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
      <Typography variant="h4" color="primary" style={{ marginBottom: 16 }}>
        {card.title}
      </Typography>
      <Typography style={{ marginBottom: 32 }}>{card.description}</Typography>
      {card.buttonText && card.onPress ? (
        <Button
          title={card.buttonText}
          onPress={card.onPress}
          loading={card.loading}
          style={{ width: 160 }}
        />
      ) : null}
    </Card>
  );
};
