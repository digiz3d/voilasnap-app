import { Camera } from 'expo-camera'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'

import { setCurrentSnap } from '../../reducers/messages'

import SnapPreview from './containers/SnapPreview'

const FORMAT_HEIGHT = 4
const FORMAT_WIDTH = 3

const Cam = ({ cancelSnap, currentSnap, sendSnap, setCurrentSnap }) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraSide, setCameraSide] = useState(Camera.Constants.Type.back)
  const [availableSpace, setAvailableSpace] = useState({ height: 0, width: 0 })
  const cameraRef = useRef()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null || hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const switchCameraSide = () => {
    setCameraSide(
      cameraSide === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    )
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.6,
          base64: true,
          exif: false,
          onPictureSaved: undefined,
        })
        setCurrentSnap(photo)
      } catch (e) {
        console.warn(e)
      }
    }
  }

  const height = availableSpace.height
  const width = (height * FORMAT_WIDTH) / FORMAT_HEIGHT

  const canRenderCamera = !!(availableSpace.width && availableSpace.height)

  return (
    <View
      style={style.screen}
      onLayout={(e) =>
        setAvailableSpace({
          height: e.nativeEvent.layout.height,
          width: e.nativeEvent.layout.width,
        })
      }>
      {canRenderCamera && (
        <>
          <Camera
            style={{
              width,
              height: Math.floor(height),
              position: 'absolute',
              left: -((width - availableSpace.width) / 2),
            }}
            type={cameraSide}
            ratio={`${FORMAT_HEIGHT}:${FORMAT_WIDTH}`}
            ref={cameraRef}
            onCameraReady={() => console.log('camera ready !')}
          />
          <View style={style.bottom}>
            <View style={style.bottomAction}>
              <TouchableOpacity onPress={switchCameraSide}>
                <Text style={style.cameraSwitch}>Flip</Text>
              </TouchableOpacity>
            </View>
            <View style={style.bottomAction}>
              <TouchableOpacity onPress={takePicture}>
                <View style={style.aperture} />
              </TouchableOpacity>
            </View>
            <View style={style.bottomAction}></View>
          </View>
          <SnapPreview snap={currentSnap} onSend={sendSnap} onCancel={cancelSnap} />
        </>
      )}
    </View>
  )
}

const mapStateToProps = null

const mapDispatchToProps = { setCurrentSnap }
export default connect(mapStateToProps, mapDispatchToProps)(Cam)

const style = StyleSheet.create({
  screen: { flex: 1, flexDirection: 'column-reverse' },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    height: 200,
  },
  bottomAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aperture: {
    borderRadius: 100,
    borderWidth: 7,
    borderColor: '#7f7f7f',
    height: 70,
    width: 70,
  },
  cameraSwitch: {
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
})
