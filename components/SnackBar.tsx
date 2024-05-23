import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import { Configurations } from "../providers/SnackBarProvider";

interface Props {
  visible: boolean;
  configurations: Configurations | null;
  onClose: () => void;
  onHide: () => void;
}

const DEVICE_HEIGHT = Dimensions.get("window").height;

const SnackBar: React.FC<Props> = (props) => {
  const {
    color,
    message,
    duration,
    textStyle,
    animationDuration,
    autoHide,
    showCloseButton,
    icon,
    closeButton,
  } = props.configurations ?? {};

  const translateY = useRef(new Animated.Value(0)).current;
  const [viewHeight, setViewHeight] = React.useState(0);

  const styles = getStyles();

  useEffect(() => {
    let timer: any;
    if (props.visible && viewHeight > 0) {
      startAnimation();

      if (autoHide) {
        timer = setTimeout(() => {
          endAnimation();
        }, duration);
      }
    } else {
      endAnimation();
    }
    return () => {
      if (!props.visible && timer && autoHide) {
        clearTimeout(timer);
      }
    };
  }, [props.visible, viewHeight]);

  const startAnimation = () => {
    Animated.timing(translateY, {
      toValue: -viewHeight - 50,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    if (viewHeight === 0) return;
    Animated.timing(translateY, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      props.onHide();
      setViewHeight(0);
    });
  };

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    if (props.visible) {
      setViewHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY }] }]}
      onLayout={handleLayoutChange}
    >
      {renderIcon()}
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{message}</Text>
      </View>
      {renderCloseButton()}
    </Animated.View>
  );

  function renderIcon() {
    if (!icon) return null;

    return <View style={styles.iconContainer}>{icon}</View>;
  }

  function renderCloseButton() {
    if (!showCloseButton) return null;

    if (closeButton) {
      return (
        <View style={styles.closeButton}>{closeButton(props.onClose)}</View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={props.onClose}
          hitSlop={10}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      );
    }
  }

  function getStyles() {
    return StyleSheet.create({
      container: {
        position: "absolute",
        top: DEVICE_HEIGHT,
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        paddingVertical: "4%",
        paddingHorizontal: "4%",
        backgroundColor: color,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      text: {
        color: "#fff",
        fontSize: 16,
        ...textStyle,
      },
      closeText: {
        color: "#fff",
        fontWeight: "bold",
      },
      closeButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      messageContainer: {
        flex: 6,
      },
      iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    });
  }
};

export default SnackBar;
