import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permissao, setPermissao] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissao(status === "granted");
    })();
  }, []);

  if (permissao === null) {
    return <View />;
  }
  if (permissao === false) {
    return <Text>Acesso negado</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera type={type} style={styles.camera}></Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});
