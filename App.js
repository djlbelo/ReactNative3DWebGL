import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Expo from 'expo';
import {Scene, Mesh, MeshBasicMaterial, PerspectiveCamera, BoxBufferGeometry} from 'three';
import { Renderer, TextureLoader, THREE } from 'expo-three';
import * as GL from 'expo-gl';

const App = () => {

  const onContextCreate = async (gl) =>{
    //THREE.js

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth/gl.drawingBufferHeight,
      0.1,
      1000
    )

    gl.canvas = {width: gl.drawingBufferWidth, heigth: gl.drawingBufferHeight}
    camera.position.z = 2

    const renderer = new Renderer({gl})
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight)

    const geometry = new BoxBufferGeometry(1,1,1)
    const material = new MeshBasicMaterial({
      color: 'red'
    })
    const cube = new Mesh(geometry, material)
    scene.add(cube)

    const render = () => {
      requestAnimationFrame(render)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    render()
  }

  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GL.GLView     
        style ={{width:500, heigth:500}}
        onContextCreate = {onContextCreate}
      />
    </View>
  )
}

export default App
