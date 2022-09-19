import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../store/auth/actions";
import { getCurrentUser } from "../store/auth/reducer";

const AuthContext = (props: { children: JSX.Element }) => {
  const currentUser = useSelector((state) => getCurrentUser(state));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(actions.login(true));
    }
  }, []);

  if (
    Platform.OS === "web" &&
    window.location.hash &&
    window.location.hash.includes("#code")
  ) {
    return <div>Loading...</div>;
  }

  return <>{props.children}</>;
};

export default AuthContext;
