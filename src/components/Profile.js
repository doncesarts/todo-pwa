
import React, { Component } from 'react';
import urlB64ToUint8Array from '../common/utils'
import greyProfileImg from '../grey_profile.png'

class Profile extends Component {

  state = {
    image: null,
    supportsCamera: 'mediaDevices' in navigator
  }

  changeImage = (e) => {
    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    })
  }

  startChangeImage = () => {
    this.setState({ enableCamera: !this.state.enableCamera })
  }

  takeImage = () => {
    this._canvas.width = this._video.videoWidth
    this._canvas.height = this._video.videoHeight

    this._canvas.getContext('2d').drawImage(
      this._video,
      0, 0,
      this._video.videoWidth,
      this._video.videoHeight
    )

    this._video.srcObject.getVideoTracks().forEach(track => {
      track.stop()
    })

    this.setState({
      image: this._canvas.toDataURL(),
      enableCamera: false
    })
  }

  subscribe = () => {
    const key = "BDk-kDxLswQMajg9TJqpb9VFTjQeQmS0FE_rTVJ4f9G-v9GFkzcDt-vYkvz5dVkbCfrGmJeLTbvuNUKpOUojWB4"

    global.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(key)
    }).then(sub => {
      console.log("Subscribed!")
    }).catch(err => {
      console.log("Did not subscribe.")
    })

  }

  testPushMessage = () => {
    global.registration.showNotification('Test Message', {
      body: 'Success!'
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h3">
            Add your personal details
            </span>
        </nav>

        <div style={{ textAlign: 'center' }}>
          <img 
            src={this.state.image || greyProfileImg} alt="profile" 
            style={{ height: 200, marginTop: 50 }} 
          />
          <p style={{ color: '#888', fontSize: 20 }}>username</p>

          {
            this.state.enableCamera &&
            <div>
              <video 
                ref={c => {
                  this._video = c
                  if(this._video) {
                    navigator.mediaDevices.getUserMedia({ video: true })
                      .then(stream => this._video.srcObject = stream)
                  }
                }}
                controls={false} autoPlay
                style={{ width: '100%', maxWidth: 300 }}
              ></video>

              <br />

              <button
                onClick={this.takeImage}
              >Take Image</button>

              <canvas 
                ref={c => this._canvas = c}
                style={{ display: 'none' }}
              />

            </div>
          }

          <br />
          {
            this.state.supportsCamera &&
            <button
              onClick={this.startChangeImage}
            >
              Toggle Camera
            </button>
          }

          <br />
          <button onClick={this.subscribe}>Subscribe for Notifications</button>

          <br />
          <button
            onClick={this.testPushMessage}
          >Test Push Message</button>

        </div>

      </div>
    )
  }

}

export default (Profile) ;

