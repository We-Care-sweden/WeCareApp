import React, {useContext} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {Context} from '../utils/Store'
import Good from '../assets/img/good.svg'
import SomeRisk from '../assets/img/someRisk.svg'
import HighRisk from '../assets/img/highRisk.svg'

const {width, height} = Dimensions.get('window')

const EmojiLayer = ({dayValue, index}) => {
  const {appState} = useContext(Context)
  return (
    <View>
      <View>
        {dayValue === 1 ? (
          appState.i18n.locale === 'farsi' ? (
            <Good
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.055,
                left:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          ) : (
            <Good
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.055,
                right:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          )
        ) : dayValue === 2 ? (
          appState.i18n.locale === 'farsi' ? (
            <SomeRisk
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.14,
                left:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          ) : (
            <SomeRisk
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.14,
                right:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          )
        ) : (
          dayValue === 3 &&
          (appState.i18n.locale === 'farsi' ? (
            <HighRisk
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.24,
                left:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          ) : (
            <HighRisk
              width={20}
              height={20}
              style={{
                position: 'absolute',
                bottom: height * 0.24,
                right:
                  index === 0
                    ? width * 0.31
                    : index === 1
                    ? width * 0.2
                    : index === 2
                    ? width * 0.08
                    : index === 3
                    ? -width * 0.04
                    : index === 4
                    ? -width * 0.165
                    : index === 5
                    ? -width * 0.285
                    : index === 6
                    ? -width * 0.405
                    : 0,
              }}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default EmojiLayer

const styles = StyleSheet.create({})
