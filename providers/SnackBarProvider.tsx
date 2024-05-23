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
  /**
   * To show the SnackBar component
   * @param message Message to be displayed in the SnackBar
   * @param type Type of the SnackBar. Can be "error", "success" or "info"
  */
  showSnackBar: (message: string, type: "error" | "success" | "info") => void;
  /**
   * To hide the SnackBar component
  */
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

interface SnackBarProps {
  /**
   * color of the SnackBar
   */
  color?: string;
  /**
   * How long the SnackBar should be visible. Default is 3000ms
   */
  duration?: number;
  /**
   * Should the SnackBar auto hide after duration. 
   * Default values: ```success:true```, ```info:true```, ```error: false```
   */
  autoHide?: boolean;
  /**
   * Should the close button be visible. 
   * Default values: ```success:false```, ```info:false```, ```error: true```
   */
  showCloseButton?: boolean;
  /**
   * Icon to be displayed in the SnackBar. The icon will be placed before the message.
   */
  icon?: React.ReactNode;
  /**
   * Style of the text in the SnackBar
   */
  textStyle?: TextStyle;
  /**
   * Animation duration of the SnackBar. Default is 300ms
   */
  animationDuration?: number;
  /**
   * Custom close button. If provided, the default close button will be replaced with this. 
   * But make sure to call ```hideSnackBar``` from your close button component to hide the ```SnackBar``` upon close button press
   */
  closeButton?: (hideSnackBar?: () => void) => React.ReactNode;
}

interface SnackBarProviderProps extends PropsWithChildren {
  /**
   * Global options for the SnackBar. These options will be applied to all the SnackBars.
   */
  globalOptions?: SnackBarProps;
  /**
   * Options for the error SnackBar
   */
  error?: SnackBarProps;
  /**
   * Options for the success SnackBar
   */
  success?: SnackBarProps;
  /**
   * Options for the info SnackBar
   */
  info?: SnackBarProps;
}

export interface Configurations extends SnackBarProps {
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
