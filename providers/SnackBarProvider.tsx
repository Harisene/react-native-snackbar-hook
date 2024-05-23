import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import Snackbar from "../components/SnackBar";
import { TextStyle } from "react-native";

const initialState = {
  showSnackBar: (message: string, type: "error" | "success" | "info") => {},
  hideSnackBar: () => {},
};

interface SnackBarContextProps {
  showSnackBar: (message: string, type: "error" | "success" | "info") => void;
  hideSnackBar: () => void;
}

const SnackBarContext = createContext<SnackBarContextProps>(initialState);

const DEFAULT_SNACKBAR_PROPS = {
  error: {
    color: "#c20600",
    duration: 3000,
    autoHide: false,
    showCloseButton: true,
    animationDuration: 300,
  },
  success: {
    color: "#008c0c",
    duration: 3000,
    autoHide: true,
    showCloseButton: false,
    animationDuration: 300,
  },
  info: {
    color: "#003f8c",
    duration: 3000,
    autoHide: true,
    showCloseButton: false,
    animationDuration: 300,
  },
};

export interface SnackBarCommonProps {
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

export interface Configurations extends SnackBarCommonProps {
  message: string;
}

const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  globalOptions,
  children,
  error,
  success,
  info,
}) => {
  const [configurations, setConfigurations] = useState<Configurations | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <SnackBarContext.Provider value={{ showSnackBar, hideSnackBar: handleHide }}>
      <>
        {children}
        <Snackbar
          visible={visible}
          configurations={configurations}
          onClose={handleClose}
          onHide={handleHide}
        />
      </>
    </SnackBarContext.Provider>
  );

  function showSnackBar(message: string, type: "error" | "success" | "info") {
    if (visible) return;
    switch (type) {
      case "error":
        setConfigurations({
          ...DEFAULT_SNACKBAR_PROPS.error,
          ...globalOptions,
          ...error,
          message,
        });
        setVisible(true);
        break;
      case "success":
        setConfigurations({
          ...DEFAULT_SNACKBAR_PROPS.success,
          ...globalOptions,
          ...success,
          message,
        });
        setVisible(true);
        break;
      case "info":
        setConfigurations({
          ...DEFAULT_SNACKBAR_PROPS.info,
          ...globalOptions,
          ...info,
          message,
        });
        setVisible(true);
        break;
      default:
        console.error("Snackbar: Invalid type");
        break;
    }
  }

  function handleClose() {
    setVisible(false);
  }

  function handleHide() {
    setVisible(false);
    setConfigurations(null);
  }
};

export default SnackBarProvider;
export const useSnackBar = () => useContext(SnackBarContext);
