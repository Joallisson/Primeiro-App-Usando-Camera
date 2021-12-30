import React, {useState, useEffect, useRef} from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    Modal, 
    Image,
} from 'react-native';

import { Camera } from 'expo-camera';

import {FontAwesome} from '@expo/vector-icons';

export default function App() {

  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back) //Setando por padrão a câmera traseira
  const [hasPermission, setHasPermission] = useState(null) //Constante para guardar a permissão do usuário para usar a câmera
  const [capturePhoto, setCapturePhoto] = useState(null) //Tirar foto
  const [open, setOpen] = useState(false) //Abrir o modal da foto


  useEffect(() => { //Pegando a permissão do usuário para usar a câmera
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted");
    })()
  }, [])

  if(hasPermission === null){ //Se não houver nenhuma permissão
    return <View/>
  }

  if(hasPermission === false){ //Se a permissão for negada
    return <Text>Acesso Negado</Text>
  }
     
  async function takePicture(){ //Função para tirar a foto
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturePhoto(data.uri)
      setOpen(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Camera
      style={styles.camera}
      type = {type}
      ref = {camRef}
      >
        <View style = {styles.contentButtons}>
        <TouchableOpacity
          style = {styles.buttonFlip}
          onPress = {() => {
            setType(
              type === Camera.Constants.Type.back ?
              Camera.Constants.Type.front :
              Camera.Constants.Type.back
            )
          }}
          >
            <FontAwesome name = "exchange" size = {23} color = "red"></FontAwesome>
          </TouchableOpacity>


          <TouchableOpacity
          style = {styles.buttonCamera}
          onPress = {takePicture}
          >
            <FontAwesome name = "camera" size = {23} color = "#fff"></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>

      
      {capturePhoto && (
        <Modal
        animationType = {"slide"}
        transparent = {true}
        visible = {open}
        >
          <View style = {styles.contentModal}>
            <TouchableOpacity
            style = {styles.closeButton}
            onPress = {() => {setOpen(false)}}
            >
              <FontAwesome name = {"close"} size = {50} color = {"#fff"}></FontAwesome>
            </TouchableOpacity>
            
            <Image style = {styles.imgPhoto} source = {{uri: capturePhoto}}/>
          </View>
        </Modal>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera:{
    width: "100%",
    height: "100%",
  },
  contentButtons:{
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonFlip:{
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera:{
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
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 2,
    margin: 10,
  },
  imgPhoto:{
    width: "100%",
    height: 400
  }
});
