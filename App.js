import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard
} from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  useEffect(() => {

    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([//inicia as animações simultaneamente

      Animated.spring(offset.y, {//animação para o conteiner
        toValue: 0,
        speed: 4,
        bounciness: 30,
        useNativeDriver: true
      }),

      Animated.timing(opacity, {//animação visualizar conteiner
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })

    ]).start();//inicia as animações assim que iniciar o app

  }, []);

  function keyboardDidShow() {

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false
      }),

      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false
      }),
    ]).start();

  }

  function keyboardDidHide() {

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false
      }),

      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: false
      }),
    ]).start();

  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.conteinerLogo}>

        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />

      </View>

      <Animated.View style={[
        styles.conteiner,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y }
          ]
        }
      ]}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>
            Acessar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>
            Criar conta gratuita
          </Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },

  conteinerLogo: {
    flex: 1,
    justifyContent: 'center'
  },

  conteiner: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    paddingBottom: 50
  },

  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },

  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  submitText: {
    color: '#fff',
    fontSize: 17
  },

  btnRegister: {
    marginTop: 10,
  },

  registerText: {
    color: '#fff'
  }
});