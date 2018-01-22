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
			selectedInstrument: 269
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
		this.stopAll();
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
	startPlay(){
		var guitar=this.state.selectedInstrument;
		var data=[
			 [[],[[guitar,[S6+1,S5+3,S4+3],3/16,1]]]
			,[[],[]]
			,[[],[]]
			,[[],[[guitar,[S6+1,S5+3,S4+3],1/16,1]]]			
			,[[],[[guitar,[S6+1,S5+3,S4+3],2/16,2]]]
			,[[],[]]
			,[[],[[guitar,[S5+1,S4+3,S3+3],1/16,3]]]
			,[[],[[guitar,[S5+1,S4+3,S3+3],1/16,3]]]

			,[[],[[guitar,[S5+1,S4+3,S3+3],1/16,3]]]
			,[[],[[guitar,[S5+1,S4+3,S3+3],1/16,3]]]
			,[[],[[guitar,[S5+1,S4+3,S3+3],2/16,1]]]
			,[[],[]]
			,[[],[[guitar,[S5+1,S4+3,S3+3],2/16,1]]]
			,[[],[]]
			,[[],[[guitar,[S5+0,S4+0,S3+0],2/16,2]]]
			,[[],[]]

			,[[],[[guitar,[S6+4,S5+6,S4+6],3/16,1]]]
			,[[],[]]
			,[[],[]]
			,[[],[[guitar,[S6+4,S5+6,S4+6],1/16,1]]]
			,[[],[[guitar,[S6+4,S5+6,S4+6],2/16,2]]]
			,[[],[]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],1/16,3]]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],1/16,3]]]

			,[[],[[guitar,[S5+4,S4+6,S3+6],1/16,3]]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],1/16,3]]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],2/16,1]]]
			,[[],[]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],2/16,1]]]
			,[[],[]]
			,[[],[[guitar,[S5+4,S4+6,S3+6],2/16,2]]]
			,[[],[]]			
		];
		this.midiSounds.startPlayLoop(data, 120, 1/16);
	}
	stopAll(){
		this.midiSounds.stopPlayLoop();
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 8</h1>
        </header>
        <p className="App-intro">Select instrument and press a Play.</p>		
		<p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select></p>
		<p>
			<button type="button" onClick={this.startPlay.bind(this)} >Play</button>
			<button type="button" onClick={this.stopAll.bind(this)} >Stop</button>
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
