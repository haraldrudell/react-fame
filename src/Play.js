/*
© 2018-present Harald Rudell <harald.rudell@gmail.com> (http://www.haraldrudell.com)
This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree.
*/
import React from 'react'
import Sound from 'react-sound'

export default ({onFinished}) =>
  <Sound
    url='./Fame.mp3'
    playStatus={Sound.status.PLAYING}
    onFinishedPlaying={onFinished}
  />
