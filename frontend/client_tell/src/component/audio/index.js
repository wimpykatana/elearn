import React, { Component } from 'react';

class Audio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rplayer: new window.rPlayer()
        }

        this.setAudio = this.setAudio.bind(this);
    }
   
    setAudio() {
        this.state.rplayer.play(this.props.src)
        const element = document.getElementById("Audio")
   
        const audio = this.state.rplayer.audio;
        audio.setAttribute("controls", "")
        element.appendChild(audio);
    }

    render() {
        return (<div ref={this.setAudio} id="Audio">&nbsp;</div>)
    }
}

export default Audio;