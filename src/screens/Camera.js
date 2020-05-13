import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

const FORMAT_HEIGHT = 16
const FORMAT_WIDTH = 9

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [availableSpace, setAvailableSpace] = useState({ height: 0, width: 0 })
  const cameraRef = useRef()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  let width = availableSpace.width
  let height = (width * FORMAT_HEIGHT) / FORMAT_WIDTH

  if (height < availableSpace.height) {
    height = availableSpace.height
    width = (height * FORMAT_WIDTH) / FORMAT_HEIGHT
  }

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
        <Camera
          style={{ width, height: Math.floor(height) }}
          type={type}
          ratio={`${FORMAT_HEIGHT}:${FORMAT_WIDTH}`}
          useCamera2Api={true}
          ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                )
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  )
}
