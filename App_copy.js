import React, {useEffect, useRef, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  RNCameraView,
} from 'react-native-vision-camera';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// function App(): JSX.Element {
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermissions() {
      const permission = await Camera.requestCameraPermission();
      console.log('permission: ', permission);
      if (permission === 'denied') {
        await Linking.openSettings();
      }
    }
    getPermissions();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log('path: ', photo.path);
    }
  };

  if (device === null) {
    return <Text>No camera found</Text>;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            device={device}
            style={{flex: 1}}
            photo={true}
            isActive={showCamera}
          />
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={capturePhoto}
              style={{
                flex: 0,
                backgroundColor: '#fff',
                borderRadius: 5,
                padding: 15,
                paddingHorizontal: 20,
                alignSelf: 'center',
                margin: 20,
              }}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <RNCameraView style={styles.cameraView} />
          ) : (
            <Text>No Image</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  cameraView: {
    width: '100%',
    height: '100%',
  },
});

export default App;

{
  /* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> 
  );
}*/
}

// Build a Camera screen with React Native Camera Vision where i can see the camera capture on screen and take a picture and save it to the gallery.