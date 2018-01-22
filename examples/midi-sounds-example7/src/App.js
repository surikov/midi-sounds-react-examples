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

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedInstrument: 260
		};
	}
	componentDidMount() {
		this.setState({ initialized: true });
	}
	onSelectInstrument(e){
		var list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedInstrument: n
		});
		this.midiSounds.cacheInstrument(n);
	}
	createSelectItems() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.instrumentKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.instrumentInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	playCurSingle() {
		this.midiSounds.playChordNow(this.state.selectedInstrument, [4 * O + A], 2.5);
	}
	playCurChord() {
		this.midiSounds.playChordNow(this.state.selectedInstrument, _Em, 2.5);
	}
	playCurDown() {
		this.midiSounds.playStrumDownNow(this.state.selectedInstrument, _Em, 2.5);
	}
	playCurUp() {
		this.midiSounds.playStrumUpNow(this.state.selectedInstrument, _Em, 2.5);
	}
	playCurSnap() {
		this.midiSounds.playSnapNow(this.state.selectedInstrument, _Em, 2.5);
	}
	playCurStrings() {
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 0, this.state.selectedInstrument, [S6], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 1, this.state.selectedInstrument, [S5], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 2, this.state.selectedInstrument, [S4], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 3, this.state.selectedInstrument, [S3], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 4, this.state.selectedInstrument, [S2], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 5, this.state.selectedInstrument, [S1], 1);

	}
	playCurBass() {
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 0, this.state.selectedInstrument, [X6], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 1, this.state.selectedInstrument, [X5], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 2, this.state.selectedInstrument, [X4], 1);
		this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 3, this.state.selectedInstrument, [X3], 1);

	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 7</h1>
        </header>
        <p className="App-intro">Select instrument and press a button.</p>		
		<p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select></p>
		<p>
			<button onClick={this.playCurSingle.bind(this)}>Single E</button>
			<button onClick={this.playCurChord.bind(this)}>Chord Em</button>
			<button onClick={this.playCurDown.bind(this)}>Down Em</button>
			<button onClick={this.playCurUp.bind(this)}>Up Em</button>
			<button onClick={this.playCurSnap.bind(this)}>Snap Em</button>
			<button onClick={this.playCurStrings.bind(this)}>Guitar Strings</button>
			<button onClick={this.playCurBass.bind(this)}>Bass Strings</button>
		</p>
		<p>Component</p>
		<MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[this.state.selectedInstrument]} />	
		<hr/>
		<p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;
