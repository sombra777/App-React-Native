import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'
//import image from './assets/Diamond-red.png'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    // pedimos permisos de usuario para usar la galeria
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted == false) {
      alert('Permissio to acces camera is require')
      return;
    }
    // para cuando seleccione la img la guarde en un state 
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === true) {
      return;
    }
    // queda guardada en el estado accediendo a su url con la propiedad uri
    setSelectedImage({ localuri: pickerResult.uri })
  }

  const openSharingDialog = async () => {
    //validamos que la api sea compatible 
    if (!(await Sharing.isAvailableAsync())) {
      alert("sharing, is not available on your plataform");
      return;
    }
    //hacemos la opcion para que ya pueda compartir la imagen 
    await Sharing.shareAsync(selectedImage.localuri)
  }

  return <View style={style.container}>
    <Text style={style.title}>Pick an image</Text>
    <TouchableOpacity
      onPress={openImagePickerAsync}
    >
      <Image
        onPress={openImagePickerAsync}
        source={{
          uri:
            selectedImage !== null
              ? selectedImage.localuri :
              'https://i.picsum.photos/id/516/200/200.jpg?hmac=CsDADXBJh2feopw8BAy8PQ6Ma5u0as6pKj5EuJ7zyMw'
        }}
        style={style.image}
      />
    </TouchableOpacity>
    {
      // si selectedImage tiene algun valor que muestre el boton
      selectedImage ?
        <TouchableOpacity
          onPress={openSharingDialog}
          style={style.button}
        >
          <Text style={style.buttonText}>Share this image</Text>
        </TouchableOpacity>
        :
        // si no, que solo muestre la vista, hasta que muestre el boton
        <View />
    }
  </View>
 
}


//-------------------------------------ESTILOS  CSS ------------------------------------------------------
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#292929"
  },
  title:
  {
    fontSize: 30,
    color: "#fff"
  },
  image: {
    height: 180, width: 180, borderRadius: 90, resizeMode: 'contain'
  },
  button: {
    backgroundColor: 'gray',
    padding: 12,
    marginTop: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})

export default App