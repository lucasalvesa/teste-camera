// import React, {useEffect, useRef} from 'react';
// import {Linking, SafeAreaView, Text, View, StyleSheet} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

// function App() {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     async function getPermissions() {
//       const permission = await Camera.requestCameraPermission();
//       console.log('permission: ', permission);
//       if (permission === 'denied') {
//         await Linking.openSettings();
//       }
//     }
//     getPermissions();
//   }, []);

//   if (device == null) {
//     return <Text>No camera found</Text>;
//   }

//   return (
//     <SafeAreaView>
//       <View style={styles.sectionContainer}>
//         <Camera
//           device={device}
//           style={{flex: 1}}
//           isActive={true}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default App;

// import React, {useCallback, useEffect, useRef} from 'react';
// import {Linking, SafeAreaView, Text, StyleSheet} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

// function App() {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   useEffect(() => {
//     async function getPermissions() {
//       const status = await Camera.requestCameraPermission();
//       console.log('Camera permission status:', status);

//       if (status === 'authorized') {
//         startScanning();
//       } else if (status === 'denied') {
//         await Linking.openSettings();
//       }
//     }

//     getPermissions();
//   }, [startScanning]);

//   const startScanning = useCallback(() => {
//     if (camera.current) {
//       console.log('Starting scanning...');
//       camera.current.startScanning({
//         barCodeTypes: [Camera.BarCodeType.QR],
//         onBarCodeScanned: handleBarCodeScanned,
//       });
//     }
//   }, []);

//   const handleBarCodeScanned = ({barcodes}) => {
//     if (barcodes.length > 0) {
//       console.log('QR Code scanned:', barcodes[0].data);
//     }
//   };

//   if (device == null) {
//     return <Text>No camera found</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Camera
//         ref={camera}
//         style={styles.camera}
//         device={device}
//         isActive={true}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default App;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking, SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import 'react-native-reanimated';

function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {barcodes.map((barcode, idx) => (
        <View key={idx} style={{padding: 50}}>
          <Text style={styles.barcodeTextURL}>{barcode.displayValue}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default App;
