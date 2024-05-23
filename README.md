# react-native-snackbar-hook #

<br>

![Screen Recording 2024-05-23 at 3 02 52 PM (2)](https://github.com/Harisene/react-native-snackbar-hook/assets/33250282/f014eeab-16fb-4a23-9706-19bb7827e9d1)
![info basic](https://github.com/Harisene/react-native-snackbar-hook/assets/33250282/18c3960d-45da-4623-8ab3-da69751db3ad)
![success basic](https://github.com/Harisene/react-native-snackbar-hook/assets/33250282/6798ce05-5b8d-44ff-8919-b6abb539e491)
![success icon](https://github.com/Harisene/react-native-snackbar-hook/assets/33250282/73001d4d-a467-4e51-9054-ce745aed699a)


<br>
<br>

## Features :star_struck: :star_struck:

:sparkle: You can use ```useSnackBar``` hook to control the snackbar from any component.

:sparkle: ```SnackBarProvider``` higher order component helps to maintain clean code.

:sparkle: This package uses ```Animated``` API from ```react-native```.

:sparkle: All the animations are running on the main thread.

:sparkle: No third-party packages are used.

:sparkle: Customize the ```SnackBar``` component the way you want. ```SnackBarProvider```accepts many properties to customize your ```SnackBar``` component.

<br>

## Hey! Would you like to contribute to this package?! :raised_hands: :handshake:
Go ahead, fork the repo, and create many pull requests. :smile: :smile:

<br>

## Installation Guide ##

install the package by running the below command
```
  npm install react-native-snackbar-hook
```
or
```
  yarn add react-native-snackbar-hook
```
<br>

## How to use ##

### Step 01 ###

Wrap your screen component or the root component with ```SnackBarProvider```

```
import { SnackBarProvider } from 'react-native-snackbar-hook';

  <GestureHandlerRootView style={{ flex: 1 }}>
    <SnackBarProvider>
      <NavigationContainer>
        <Stacks/>
      </NavigationContainer>
    </SnackBarProvider>
  </GestureHandlerRootView>

```

### Step 02 ###

import the ```useSnackBar``` and use ```showSnackBar``` and ```hideSnackBar``` functions.
You need to pass the message and the type of SnackBar component you want to use to ```showSnackBar``` function.

```
import { useSnackBar } from "react-native-snackbar-hook";

export default function HomeScreen() {
  const { showSnackBar } = useSnackBar();

  const handlePress = () => {
    showSnackBar("This is an error message", "error");
  };

  return (
    <View style={styles.container}>
      <Button title="Show Error" onPress={handlePress} />
    </View>
  );
}

```

## Props ##

### ```SnackBarProvider``` Props ###

Prop name | type | required | description | default value
--- | --- | --- | --- | ---
globalOptions | SnackBarProps | N | Set global properties. This will apply to all types of ```SnackBar``` | null
error | SnackBarProps | N | Set properties for the ```error``` type ```SnackBar``` | null
success | SnackBarProps | N | Set properties for the ```success``` type ```SnackBar``` | null
info | SnackBarProps | N | Set properties for the ```info``` type ```SnackBar``` | null

### SnackBarProps ###

Prop name | type | required | description | default value
--- | --- | --- | --- | ---
color | string | N | color of the ```SnackBar``` | success: ```#008c0c```, info: ```#003f8c```, error: ```#c20600```
duration | number | N | How long the ```SnackBar``` should be visible | ```3000``` milliseconds
animationDuration | number | N | How long the animation should run | ```300``` miliseconds
autoHide | boolean | N | ```SnackBar``` will hide automatically after passing the ```duration``` time | success:```true```, info:```true```,  error: ```false```
showCloseButton | boolean | N | show predefined close button on the ```SnackBar```. If you want add your own close button use ```closeButton``` property. | success:```false```, info:```false```,  error: ```true```
icon | ReactNode | N | Add icon to the ```SnackBar```. The icon will be placed before the ```message```. | null
textStyle | TexyStyle | N | Style the text in the ```SnackBar``` | null
closeButton | (hideSnackBar?: () => void) => ReactNode | N | Add your own close button component here. But make sure to call ```hideSnackBar``` from your component to hide the ```SnackBar``` upon close button press | Predefined Component

### ```useSnackBar``` return functions ###

Function name | description
--- | ---
showSnackBar | To show the ```SnackBar``` component
hideSnackBar | To hide the ```SnackBar``` component

### ```showSnackBar``` function arguments ###

Arg name | type | required | description
--- | --- | --- | ---
message | string | Y | text that you want to show in the ```SnackBar```
type | "success" | "info" | "error" | Y | type of the ```SnackBar```


