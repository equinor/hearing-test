import { giveSalute, types } from "react-native-salute";

import ToastStyles from '../constants/ToastStyles'; // eslint-disable-line

export const ToastTypes = {
  SUCCESS: "SUCCESS",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
  REFRESH: "REFRESH",
};

const applyType = (type) => {
  switch (type) {
    case ToastTypes.SUCCESS:
      return types.SUCCESS;
    case ToastTypes.WARNING:
      return types.WARNING;
    case ToastTypes.ERROR:
      return types.ERROR;
    case ToastTypes.REFRESH:
      return types.NO_STYLE;
    default:
      return types.INFO;
  }
};

const applyStyles = (type) => {
  switch (type) {
    case ToastTypes.SUCCESS:
      return ToastStyles.success;
    case ToastTypes.WARNING:
      return ToastStyles.warning;
    case ToastTypes.ERROR:
      return ToastStyles.error;
    case ToastTypes.REFRESH:
      return ToastStyles.refresh;
    case ToastTypes.INFO:
    default:
      return ToastStyles.info;
  }
};

const applyDurationByType = (type) => {
  switch (type) {
    case ToastTypes.ERROR:
      return 5000;
    case ToastTypes.REFRESH:
      return null;
    case ToastTypes.SUCCESS:
    case ToastTypes.WARNING:
    case ToastTypes.INFO:
    default:
      return 3000;
  }
};

export const addToast = (toast) => {
  giveSalute({
    ...toast,
    type: applyType(toast.type),
    duration: applyDurationByType(toast.type),
    styles: applyStyles(toast.type),
  });
};
