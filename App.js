import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { Camera } from 'expo-camera';

export default function App() {

  const [type, setType] = useState(Camera.Constants.Type.back) //Setando por padrão a câmera traseira
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => { //Pegando a permissão do usuário para usar a câmera
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted");
    })();
  }, [])

  if(hasPermission == null){ //Se não houver nenhuma permissão
    return <View/>
  }

  if(hasPermission === false){ //Se a permissão for negada
    return <Text>Acesso Negado</Text>
  }
     


  return (
    <SafeAreaView style={styles.container}>

      <Camera
      style = {styles.camera}
      type = {type}
      >
      </Camera>

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
  }, 
});
