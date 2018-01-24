import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MIDISounds from 'midi-sounds-react';

const bassDrum=2;
const snare=17;
const hiHat=56;
const cymbal=70;

const palmMute=304;//palmMute
const bassGuitar=384;//bassGuitar
const overdrive=338;//overdrive

class App extends Component {
	componentDidMount() {
		this.midiSoundsOverdrive.setInstrumentVolume(overdrive,0.9);
		this.midiSoundsOverdrive.setInstrumentVolume(palmMute,0.9);
		this.midiSoundsBass.setInstrumentVolume(bassGuitar,0.25);
		this.midiSoundsDrums.setDrumVolume(bassDrum,0.5);
		this.midiSoundsDrums.setDrumVolume(snare,0.9);
		this.midiSoundsDrums.setDrumVolume(hiHat,0.25);
		this.midiSoundsDrums.setDrumVolume(cymbal,0.9);
		this.setState({ initialized: true });
	}
	startPlay(){
		var drumsData = [
			[[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[], []], [[], []], [[snare, hiHat], []], [[], []], [[], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[bassDrum, hiHat], []], [[], []], [[snare, hiHat], []], [[], []], [[bassDrum, cymbal], []], [[], []], [[], []], [[], []], [[bassDrum], []], [[], []], [[snare, hiHat], []], [[], []], [[snare], []], [[snare], []]
		];
		var bassData = [
			[[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [30], 2 / 16]]], [[], []], [[], [[bassGuitar, [31], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [26], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [30], 2 / 16]]], [[], []], [[], [[bassGuitar, [31], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [28], 2 / 16]]], [[], []], [[], [[bassGuitar, [33], 2 / 16]]], [[], []]
		];
		var guitarData = [
			[[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [42], 2 / 16]]], [[], []], [[], [[overdrive, [43], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [38], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [42], 2 / 16]]], [[], []], [[], [[overdrive, [43], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [40], 2 / 16]]], [[], []], [[], [[palmMute, [40], 2 / 16]]], [[], []], [[], [[overdrive, [45], 2 / 16]]], [[], []]
		];
		this.midiSoundsDrums.startPlayLoop(drumsData, 120, 1/16);
		this.midiSoundsBass.startPlayLoop(bassData, 120, 1/16);
		this.midiSoundsOverdrive.startPlayLoop(guitarData, 120, 1/16);
	}
	stopAll(){
		this.midiSoundsDrums.stopPlayLoop();		
		this.midiSoundsDrums.beatIndex=0;
		this.midiSoundsBass.stopPlayLoop();		
		this.midiSoundsBass.beatIndex=0;
		this.midiSoundsOverdrive.stopPlayLoop();		
		this.midiSoundsOverdrive.beatIndex=0;
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 11</h1>
        </header>
        <p className="App-intro">Click MIDISounds logo to change channels properties and press Play.</p>	
			
		<p>
			<button type="button" onClick={this.startPlay.bind(this)} >Play</button>
			<button type="button" onClick={this.stopAll.bind(this)} >Stop</button>
		</p>
		<p>Component for percussion</p>
		<MIDISounds ref={(ref) => (this.midiSoundsDrums = ref)} appElementName="root" instruments={[overdrive,palmMute,bassGuitar]} drums={[bassDrum,snare,hiHat,cymbal]} />	
		<p>Component for bass guitar</p>
		<MIDISounds ref={(ref) => (this.midiSoundsBass = ref)} appElementName="root" instruments={[overdrive,palmMute,bassGuitar]} drums={[bassDrum,snare,hiHat,cymbal]} />
		<p>Component for overdirive</p>
		<MIDISounds ref={(ref) => (this.midiSoundsOverdrive = ref)} appElementName="root" instruments={[overdrive,palmMute,bassGuitar]} drums={[bassDrum,snare,hiHat,cymbal]} />
		<hr/>
		<p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;
