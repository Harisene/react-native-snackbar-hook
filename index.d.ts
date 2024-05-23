import { PropsWithChildren } from "react";
import { TextStyle } from "react-native";

interface SnackBarCommonProps {
  color?: string;
  duration?: number;
  autoHide?: boolean;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  textStyle?: TextStyle;
  animationDuration?: number;
  closeButton?: (hideSnackBar?: () => void) => React.ReactNode;
}

interface SnackBarProviderProps extends PropsWithChildren {
  globalOptions?: SnackBarCommonProps;
  error?: SnackBarCommonProps;
  success?: SnackBarCommonProps;
  info?: SnackBarCommonProps;
}

declare const SnackBarProvider: React.FC<SnackBarProviderProps>;
declare const useSnackBar: () => {
  showSnackBar: (message: string, type: "error" | "success" | "info") => void;
  hideSnackBar: () => void;
};