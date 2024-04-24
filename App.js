import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permissao, setPermissao] = useState(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);
  const camRef = useRef(null);
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
  function trocarDeCamera() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  async function capturarFoto() {
    if (camRef) {
      console.log(camRef);
      const data = await camRef.current.takePictureAsync();
      setFoto(data.uri);
      setOpen(true);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Camera type={type} ref={camRef} style={styles.camera}></Camera>
      <View style={styles.contentButtons}>
        <TouchableOpacity
          style={styles.buttonTrocarDeCamera}
          onPress={trocarDeCamera}
        >
          <FontAwesome name="exchange" size={23} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFoto} onPress={capturarFoto}>
          <FontAwesome name="camera" size={23} color="#fff" />
        </TouchableOpacity>
        {foto && (
          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.contentModal}>
            <TouchableOpacity style={styles.closeButton} onPress={()=>{setOpen(false)}} >
              <FontAwesome name="close" size={50} color='#fff'/>
            </TouchableOpacity>
              <Image style={styles.imgFoto} source={{uri : foto}}></Image>
               </View>
          </Modal>
        )}
      </View>
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
  contentButtons: {
    flex: 1,
    backgroundColor: "trasparent",
    flexDirection: "row",
  },
  buttonTrocarDeCamera: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonFoto: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  contentModal:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    margin:20
  },
  closeButton:{
    position:'absolute',
    top:10,
    left:2,
    margin:10,

  },
  imgFoto:{
    width:'100%',
    height:400,
  }

});
