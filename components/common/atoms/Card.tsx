import { TouchableOpacity, View } from "react-native";

const Card = (props: {
  children?: any;
  onPress?: CallableFunction;
  style?: any;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={!props.onPress}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 4,
          padding: 18,
          margin: 4,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
          ...props.style,
        }}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
