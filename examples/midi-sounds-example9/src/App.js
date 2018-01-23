import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MIDISounds from 'midi-sounds-react';

const O = 12;

const C = 0;
const c = 1;
const D = 2;
const d = 3;
const E = 4
const F = 5;
const f = 6;
const G = 7;
const g = 8;
const A = 9;
const a = 10;
const B = 11;

const S1 = 5 * O + E;
const S2 = 4 * O + B;
const S3 = 4 * O + G;
const S4 = 4 * O + D;
const S5 = 3 * O + A;
const S6 = 3 * O + E;

const X3 = 3 * O + G;
const X4 = 3 * O + D;
const X5 = 2 * O + A;
const X6 = 2 * O + E;

const _Em = [
	S6 + 0
	, S5 + 2
	, S4 + 2
	, S3 + 0
	, S2 + 0
	, S1 + 0
];

const hihat=56;
const drum=2;
const snare=17;
const pedal=35;
const bass=437;
const hit=609;
const synth=521;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			volDrum:0.7
			,volSnare:0.7
			,volHat:0.3
			,volPedal:0.8
			,volBass:1
			,volHit:0.5
			,volSynth:0.5
		};
	}
	componentDidMount() {
		this.sendVolumes();
		this.setState({ initialized: true });
	}
	onChangeTrackDrum(e){
		this.setState({volDrum: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackSnare(e){
		this.setState({volSnare: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackPedal(e){
		this.setState({volPedal: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackHat(e){
		this.setState({volHat: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackBass(e){
		this.setState({volBass: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackHit(e){
		this.setState({volHit: e.target.value});
		this.sendVolumes();
	}
	onChangeTrackSynth(e){
		this.setState({volSynth: e.target.value});
		this.sendVolumes();
	}
	sendVolumes(){
		this.midiSounds.setInstrumentVolume(synth,this.state.volSynth);
		this.midiSounds.setInstrumentVolume(hit,this.state.volHit);
		this.midiSounds.setInstrumentVolume(bass,this.state.volBass);
		this.midiSounds.setDrumVolume(hihat,this.state.volHat);
		this.midiSounds.setDrumVolume(pedal,this.state.volPedal);
		this.midiSounds.setDrumVolume(snare,this.state.volSnare);
		this.midiSounds.setDrumVolume(drum,this.state.volDrum);
	}
	changeMasterQuiet() {
		this.midiSounds.setMasterVolume(0.3);
	}
	changeMasterLoud() {
		this.midiSounds.setMasterVolume(1);
	}
	changeMasterEchoStrong() {
		this.midiSounds.setEchoLevel(1);
	}
	changeMasterEchoNone() {
		this.midiSounds.setEchoLevel(0);
	}
	changeMasterPower() {
		this.midiSounds.setBand32(2);
		this.midiSounds.setBand64(4);
		this.midiSounds.setBand128(3);
		this.midiSounds.setBand256(-2);
		this.midiSounds.setBand512(-3);
		this.midiSounds.setBand1k(1);
		this.midiSounds.setBand2k(2);
		this.midiSounds.setBand4k(3);
		this.midiSounds.setBand8k(-3);
		this.midiSounds.setBand16k(1);
	}
	changeMasterDance() {
		this.midiSounds.setBand32(2);
		this.midiSounds.setBand64(2);
		this.midiSounds.setBand128(1);
		this.midiSounds.setBand256(-1);
		this.midiSounds.setBand512(5);
		this.midiSounds.setBand1k(4);
		this.midiSounds.setBand2k(4);
		this.midiSounds.setBand4k(2);
		this.midiSounds.setBand8k(-2);
		this.midiSounds.setBand16k(3);
	}
	changeMasterNone() {
		this.midiSounds.setBand32(0);
		this.midiSounds.setBand64(0);
		this.midiSounds.setBand128(0);
		this.midiSounds.setBand256(0);
		this.midiSounds.setBand512(0);
		this.midiSounds.setBand1k(0);
		this.midiSounds.setBand2k(0);
		this.midiSounds.setBand4k(0);
		this.midiSounds.setBand8k(0);
		this.midiSounds.setBand16k(0);
	}
	startPlay(){
		var data=[
			[[pedal,drum      ],[[bass,[O*3+C],1/16],[hit,[O*5+C],1/4],[synth,[O*3+C],1/1],[synth,[O*4+C],1/1],[synth,[O*3+G],1/1],[synth,[O*5+C],1/2],[synth,[O*5+d],3/8]]]//1/16
		   ,[[pedal           ],[                                                                                                                                         ]]
		   ,[[hihat           ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*3+C],1/16],                  [synth,[O*5+d],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*3+C],1/16],                  [synth,[O*5+C],1/8]                                                                                ]]//
		   ,[[pedal           ],[[bass,[O*3+C],1/16],                  [synth,[O*3+C],1/1]                                                                                ]]
		   ,[[hihat           ],[                                      [synth,[O*5+d],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*3+C],1/16],                  [synth,[O*5+d],1/8]                                                                                ]]
		   ,[[pedal           ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*3+C],1/16],[hit,[O*4+G],1/8],[synth,[O*5+G],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*3+C],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+G],1/16],[hit,[O*5+a],1/4],[synth,[O*3+G],1/1],[synth,[O*4+G],1/1],[synth,[O*5+d],3/1],[synth,[O*5+a],3/8]                    ]]//16/16
		   ,[[pedal           ],[                                                                                                                                         ]]
		   ,[[hihat           ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+G],1/16],                  [synth,[O*5+a],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+G],1/16],                  [synth,[O*5+G],1/8]                                                                                ]]
		   ,[[pedal           ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+G],1/16],                  [synth,[O*5+a],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+G],1/16],                  [synth,[O*5+a],1/8]                                                                                ]]
		   ,[[pedal           ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+G],1/16],[hit,[O*5+d],1/8],[synth,[O*6+D],1/8]                                                                                ]]
		   ,[[                ],[[bass,[O*2+G],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+a],1/16],[hit,[O*5+F],1/1],[synth,[O*3+a],2/1],[synth,[O*4+a],2/1],[synth,[O*5+F],2/1],[synth,[O*6+F],2/1]                    ]]//32/16
		   ,[[pedal           ],[                                                                                                                                         ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+a],1/16]                                                                                                                      ]]//48/16
		   ,[[pedal           ],[                                                                                                                                         ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum      ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal,drum,snare],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[pedal           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[hihat           ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ,[[                ],[[bass,[O*2+a],1/16]                                                                                                                      ]]
		   ];
		this.midiSounds.startPlayLoop(data, 120, 1/16, this.midiSounds.beatIndex);
	}
	stopAll(){
		this.midiSounds.stopPlayLoop();		
		this.midiSounds.beatIndex=0;
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 9</h1>
        </header>
        <p className="App-intro">Change sound properties and press a Play.</p>	
		<p>Master volume</p>
		<p>
			<button type='button' onClick={this.changeMasterQuiet.bind(this)} >Quiet</button>
			<button type='button' onClick={this.changeMasterLoud.bind(this)} >Loud</button>
		</p>
		<p>Echo level</p>
		<p>
			<button type='button' onClick={this.changeMasterEchoNone.bind(this)} >Off</button>
			<button type='button' onClick={this.changeMasterEchoStrong.bind(this)} >On</button>
		</p>
		<p>Equalizer preset</p>
		<p>
			<button type='button' onClick={this.changeMasterNone.bind(this)} >None</button>
			<button type='button' onClick={this.changeMasterPower.bind(this)} >Power</button>
			<button type='button' onClick={this.changeMasterDance.bind(this)} >Dance</button>
		</p>
		<p>
			Drum <input type='range' value={this.state.volDrum} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackDrum.bind(this)} />
			<br />Snare <input type='range' value={this.state.volSnare} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackSnare.bind(this)} />
			<br />Pedal <input type='range' value={this.state.volPedal} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackPedal.bind(this)} />
			<br />HiHat <input type='range' value={this.state.volHat} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackHat.bind(this)} />
			<br />Bass guitar <input type='range' value={this.state.volBass} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackBass.bind(this)} />
			<br />Orchestra Hit <input type='range' value={this.state.volHit} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackHit.bind(this)} />
			<br />Synth strings <input type='range' value={this.state.volSynth} min={0.0} max={1.0} step={0.1} onChange={this.onChangeTrackSynth.bind(this)} />
		</p>		
		<p>
			<button type="button" onClick={this.startPlay.bind(this)} >Play</button>
			<button type="button" onClick={this.stopAll.bind(this)} >Stop</button>
		</p>
		<p>Component</p>
		<MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[bass,hit,synth]} drums={[hihat,drum,snare,pedal]} />	
		<hr/>
		<p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;
