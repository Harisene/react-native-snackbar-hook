import { PropsWithChildren } from "react";
import { TextStyle } from "react-native";

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

declare const SnackBarProvider: React.FC<SnackBarProviderProps>;
declare const useSnackBar: () => {
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
};
