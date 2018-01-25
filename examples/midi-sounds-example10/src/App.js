import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MIDISounds from 'midi-sounds-react';

const STYLE = {
	keyWhite :{
		backgroundColor: '#dddddd'
		,width:'0.5cm'
		,height:'0.75cm'
		}
	,keyWhitePress :{
		backgroundColor: '#ffaaaa'
		,width:'0.5cm'
		,height:'0.75cm'
		}
	,keyBlack :{
		backgroundColor: '#333333'
		,width:'0.5cm'
		,height:'0.5cm'
		}
	,keyBlackPress :{
		backgroundColor: '#990000'
		,width:'0.5cm'
		,height:'0.5cm'
		}
	,keyNo :{
		width:'0.5cm'
		,height:'0.5cm'
		}
	,keyMargin :{
		width:'0.25cm'
		,height:'0.5cm'
		}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.midiNotes=[];
		this.state = {
			selectedInstrument: 192
			,status:'?'
		};
	}
	componentDidMount() {
		this.envelopes=[];				
		this.startListening();
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
	keyDown(n,v){
		this.keyUp(n);
		var volume=1;
		if(v){
			volume=v;
		}
		this.envelopes[n]=this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext
			, this.midiSounds.equalizer.input
			, window[this.midiSounds.player.loader.instrumentInfo(this.state.selectedInstrument).variable]
			, 0, n, 9999,volume);
		this.setState(this.state);
	}
	keyUp(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				this.envelopes[n].cancel();
				this.envelopes[n]=null;
				this.setState(this.state);
			}
		}
	}
	pressed(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				return true;
			}
		}
		return false;
	}
	midiOnMIDImessage(event){
		var data = event.data;
		var cmd = data[0] >> 4;
		var channel = data[0] & 0xf;
		var type = data[0] & 0xf0;
		var pitch = data[1];
		var velocity = data[2];
		switch (type) {
		case 144:
			this.keyDown(pitch, velocity/127);
			break;
		case 128:
			this.keyUp(pitch);
			break;
		}
	}
	onMIDIOnStateChange(event) {
		this.setState({status:event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state});
	}
	requestMIDIAccessSuccess(midi){
		console.log(midi);
		var inputs = midi.inputs.values();
		for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			input.value.onmidimessage = this.midiOnMIDImessage.bind(this);
		}
		midi.onstatechange = this.onMIDIOnStateChange.bind(this);
	}
	requestMIDIAccessFailure(e){
		console.log('requestMIDIAccessFailure', e);
		this.setState({status:'MIDI Access Failure'});
	}
	startListening(){
		this.setState({status:'waiting'});
		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then(this.requestMIDIAccessSuccess.bind(this), this.requestMIDIAccessFailure.bind(this));
		} else {
			this.setState({status:'navigator.requestMIDIAccess undefined'});
		}
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 10</h1>
        </header>
		<p className="App-intro">Press keys or use MIDI keyboard.</p>		
		<p><select value={this.state.selectedInstrument} onChange={this.onSelectInstrument.bind(this)}>{this.createSelectItems()}</select></p>
		<p>Status: {this.state.status}</p>
		<table align="center">
				<tbody>
					<tr>
						
						<td style={STYLE.keyMargin}></td>
						
						<td style={(this.pressed(1+12*2))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(1+12*2)} onMouseUp={(e)=>this.keyUp(1+12*2)} onMouseOut={(e)=>this.keyUp(1+12*2)}></td>
						<td style={(this.pressed(3+12*2))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(3+12*2)} onMouseUp={(e)=>this.keyUp(3+12*2)} onMouseOut={(e)=>this.keyUp(3+12*2)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={(this.pressed(6+12*2))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(6+12*2)} onMouseUp={(e)=>this.keyUp(6+12*2)} onMouseOut={(e)=>this.keyUp(6+12*2)}></td>
						<td style={(this.pressed(8+12*2))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(8+12*2)} onMouseUp={(e)=>this.keyUp(8+12*2)} onMouseOut={(e)=>this.keyUp(8+12*2)}></td>
						<td style={(this.pressed(10+12*2))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(10+12*2)} onMouseUp={(e)=>this.keyUp(10+12*2)} onMouseOut={(e)=>this.keyUp(10+12*2)}></td>
						<td style={STYLE.keyNo}></td>
						
						<td style={(this.pressed(1+12*3))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(1+12*3)} onMouseUp={(e)=>this.keyUp(1+12*3)} onMouseOut={(e)=>this.keyUp(1+12*3)}></td>
						<td style={(this.pressed(3+12*3))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(3+12*3)} onMouseUp={(e)=>this.keyUp(3+12*3)} onMouseOut={(e)=>this.keyUp(3+12*3)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={(this.pressed(6+12*3))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(6+12*3)} onMouseUp={(e)=>this.keyUp(6+12*3)} onMouseOut={(e)=>this.keyUp(6+12*3)}></td>
						<td style={(this.pressed(8+12*3))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(8+12*3)} onMouseUp={(e)=>this.keyUp(8+12*3)} onMouseOut={(e)=>this.keyUp(8+12*3)}></td>
						<td style={(this.pressed(10+12*3))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(10+12*3)} onMouseUp={(e)=>this.keyUp(10+12*3)} onMouseOut={(e)=>this.keyUp(10+12*3)}></td>
						<td style={STYLE.keyNo}></td>
						
						<td style={(this.pressed(1+12*4))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(1+12*4)} onMouseUp={(e)=>this.keyUp(1+12*4)} onMouseOut={(e)=>this.keyUp(1+12*4)}></td>
						<td style={(this.pressed(3+12*4))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(3+12*4)} onMouseUp={(e)=>this.keyUp(3+12*4)} onMouseOut={(e)=>this.keyUp(3+12*4)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={(this.pressed(6+12*4))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(6+12*4)} onMouseUp={(e)=>this.keyUp(6+12*4)} onMouseOut={(e)=>this.keyUp(6+12*4)}></td>
						<td style={(this.pressed(8+12*4))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(8+12*4)} onMouseUp={(e)=>this.keyUp(8+12*4)} onMouseOut={(e)=>this.keyUp(8+12*4)}></td>
						<td style={(this.pressed(10+12*4))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(10+12*4)} onMouseUp={(e)=>this.keyUp(10+12*4)} onMouseOut={(e)=>this.keyUp(10+12*4)}></td>
						<td style={STYLE.keyNo}></td>
						
						<td style={(this.pressed(1+12*5))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(1+12*5)} onMouseUp={(e)=>this.keyUp(1+12*5)} onMouseOut={(e)=>this.keyUp(1+12*5)}></td>
						<td style={(this.pressed(3+12*5))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(3+12*5)} onMouseUp={(e)=>this.keyUp(3+12*5)} onMouseOut={(e)=>this.keyUp(3+12*5)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={(this.pressed(6+12*5))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(6+12*5)} onMouseUp={(e)=>this.keyUp(6+12*5)} onMouseOut={(e)=>this.keyUp(6+12*5)}></td>
						<td style={(this.pressed(8+12*5))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(8+12*5)} onMouseUp={(e)=>this.keyUp(8+12*5)} onMouseOut={(e)=>this.keyUp(8+12*5)}></td>
						<td style={(this.pressed(10+12*5))?STYLE.keyBlackPress:STYLE.keyBlack} onMouseDown={(e)=>this.keyDown(10+12*5)} onMouseUp={(e)=>this.keyUp(10+12*5)} onMouseOut={(e)=>this.keyUp(10+12*5)}></td>
						<td style={STYLE.keyNo}></td>
										
					</tr>
				</tbody>
			</table>
		<table align="center">
				<tbody>
					<tr>
						<td style={(this.pressed(0+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(0+12*2)} onMouseUp={(e)=>this.keyUp(0+12*2)} onMouseOut={(e)=>this.keyUp(0+12*2)}></td>
						<td style={(this.pressed(2+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(2+12*2)} onMouseUp={(e)=>this.keyUp(2+12*2)} onMouseOut={(e)=>this.keyUp(2+12*2)}></td>
						<td style={(this.pressed(4+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(4+12*2)} onMouseUp={(e)=>this.keyUp(4+12*2)} onMouseOut={(e)=>this.keyUp(4+12*2)}></td>
						<td style={(this.pressed(5+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(5+12*2)} onMouseUp={(e)=>this.keyUp(5+12*2)} onMouseOut={(e)=>this.keyUp(5+12*2)}></td>
						<td style={(this.pressed(7+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(7+12*2)} onMouseUp={(e)=>this.keyUp(7+12*2)} onMouseOut={(e)=>this.keyUp(7+12*2)}></td>
						<td style={(this.pressed(9+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(9+12*2)} onMouseUp={(e)=>this.keyUp(9+12*2)} onMouseOut={(e)=>this.keyUp(9+12*2)}></td>
						<td style={(this.pressed(11+12*2))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(11+12*2)} onMouseUp={(e)=>this.keyUp(11+12*2)} onMouseOut={(e)=>this.keyUp(11+12*2)}></td>
						
						<td style={(this.pressed(0+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(0+12*3)} onMouseUp={(e)=>this.keyUp(0+12*3)} onMouseOut={(e)=>this.keyUp(0+12*3)}></td>
						<td style={(this.pressed(2+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(2+12*3)} onMouseUp={(e)=>this.keyUp(2+12*3)} onMouseOut={(e)=>this.keyUp(2+12*3)}></td>
						<td style={(this.pressed(4+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(4+12*3)} onMouseUp={(e)=>this.keyUp(4+12*3)} onMouseOut={(e)=>this.keyUp(4+12*3)}></td>
						<td style={(this.pressed(5+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(5+12*3)} onMouseUp={(e)=>this.keyUp(5+12*3)} onMouseOut={(e)=>this.keyUp(5+12*3)}></td>
						<td style={(this.pressed(7+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(7+12*3)} onMouseUp={(e)=>this.keyUp(7+12*3)} onMouseOut={(e)=>this.keyUp(7+12*3)}></td>
						<td style={(this.pressed(9+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(9+12*3)} onMouseUp={(e)=>this.keyUp(9+12*3)} onMouseOut={(e)=>this.keyUp(9+12*3)}></td>
						<td style={(this.pressed(11+12*3))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(11+12*3)} onMouseUp={(e)=>this.keyUp(11+12*3)} onMouseOut={(e)=>this.keyUp(11+12*3)}></td>
						
						<td style={(this.pressed(0+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(0+12*4)} onMouseUp={(e)=>this.keyUp(0+12*4)} onMouseOut={(e)=>this.keyUp(0+12*4)}></td>
						<td style={(this.pressed(2+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(2+12*4)} onMouseUp={(e)=>this.keyUp(2+12*4)} onMouseOut={(e)=>this.keyUp(2+12*4)}></td>
						<td style={(this.pressed(4+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(4+12*4)} onMouseUp={(e)=>this.keyUp(4+12*4)} onMouseOut={(e)=>this.keyUp(4+12*4)}></td>
						<td style={(this.pressed(5+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(5+12*4)} onMouseUp={(e)=>this.keyUp(5+12*4)} onMouseOut={(e)=>this.keyUp(5+12*4)}></td>
						<td style={(this.pressed(7+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(7+12*4)} onMouseUp={(e)=>this.keyUp(7+12*4)} onMouseOut={(e)=>this.keyUp(7+12*4)}></td>
						<td style={(this.pressed(9+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(9+12*4)} onMouseUp={(e)=>this.keyUp(9+12*4)} onMouseOut={(e)=>this.keyUp(9+12*4)}></td>
						<td style={(this.pressed(11+12*4))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(11+12*4)} onMouseUp={(e)=>this.keyUp(11+12*4)} onMouseOut={(e)=>this.keyUp(11+12*4)}></td>
						
						<td style={(this.pressed(0+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(0+12*5)} onMouseUp={(e)=>this.keyUp(0+12*5)} onMouseOut={(e)=>this.keyUp(0+12*5)}></td>
						<td style={(this.pressed(2+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(2+12*5)} onMouseUp={(e)=>this.keyUp(2+12*5)} onMouseOut={(e)=>this.keyUp(2+12*5)}></td>
						<td style={(this.pressed(4+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(4+12*5)} onMouseUp={(e)=>this.keyUp(4+12*5)} onMouseOut={(e)=>this.keyUp(4+12*5)}></td>
						<td style={(this.pressed(5+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(5+12*5)} onMouseUp={(e)=>this.keyUp(5+12*5)} onMouseOut={(e)=>this.keyUp(5+12*5)}></td>
						<td style={(this.pressed(7+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(7+12*5)} onMouseUp={(e)=>this.keyUp(7+12*5)} onMouseOut={(e)=>this.keyUp(7+12*5)}></td>
						<td style={(this.pressed(9+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(9+12*5)} onMouseUp={(e)=>this.keyUp(9+12*5)} onMouseOut={(e)=>this.keyUp(9+12*5)}></td>
						<td style={(this.pressed(11+12*5))?STYLE.keyWhitePress:STYLE.keyWhite} onMouseDown={(e)=>this.keyDown(11+12*5)} onMouseUp={(e)=>this.keyUp(11+12*5)} onMouseOut={(e)=>this.keyUp(11+12*5)}></td>
						
						<td style={STYLE.keyMargin}></td>
						
					</tr>
				</tbody>
			</table>
		<p>Component</p>
		<MIDISounds 
			ref={(ref) => (this.midiSounds = ref)} 
			appElementName="root" 
			instruments={[this.state.selectedInstrument]} 
			/>	
		<hr/>
		<p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;
