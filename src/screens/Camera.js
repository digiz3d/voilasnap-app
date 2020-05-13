import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

const FORMAT_HEIGHT = 4
const FORMAT_WIDTH = 3

export default function Cam() {
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

  console.log(cameraSide)

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const height = availableSpace.height
  const width = (height * FORMAT_WIDTH) / FORMAT_HEIGHT

  const canRenderCamera = !!(availableSpace.width && availableSpace.height)

  return (
    <View
      style={{ flex: 1 }}
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
          />
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignItems: 'center',
              }}
              onPress={() => {
                setCameraSide(
                  cameraSide === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take picture</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}
