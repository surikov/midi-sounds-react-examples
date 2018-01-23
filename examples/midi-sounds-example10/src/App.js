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
	,keyBlack :{
		backgroundColor: '#333333'
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
		this.state = {
			selectedInstrument: 192
		};
	}
	componentDidMount() {
		this.envelopes=[];
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
	onMouseDown(n){
		this.onMouseUp(n);
		this.envelopes[n]=this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext, this.midiSounds.equalizer.input
			, window[this.midiSounds.player.loader.instrumentInfo(this.state.selectedInstrument).variable], 0, n+12+12, 9999,true);
	}
	onMouseUp(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				this.envelopes[n].cancel();
				this.envelopes[n]=null;
			}
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
		<table align="center">
				<tbody>
					<tr>
						<td style={STYLE.keyMargin}></td>
						
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(1)} onMouseUp={(e)=>this.onMouseUp(1)} onMouseOut={(e)=>this.onMouseUp(1)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(3)} onMouseUp={(e)=>this.onMouseUp(3)} onMouseOut={(e)=>this.onMouseUp(3)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(6)} onMouseUp={(e)=>this.onMouseUp(6)} onMouseOut={(e)=>this.onMouseUp(6)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(8)} onMouseUp={(e)=>this.onMouseUp(8)} onMouseOut={(e)=>this.onMouseUp(8)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(10)} onMouseUp={(e)=>this.onMouseUp(10)} onMouseOut={(e)=>this.onMouseUp(10)}></td>
						<td style={STYLE.keyNo}></td>
						
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(1+12)} onMouseUp={(e)=>this.onMouseUp(1+12)} onMouseOut={(e)=>this.onMouseUp(1+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(3+12)} onMouseUp={(e)=>this.onMouseUp(3+12)} onMouseOut={(e)=>this.onMouseUp(3+12)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(6+12)} onMouseUp={(e)=>this.onMouseUp(6+12)} onMouseOut={(e)=>this.onMouseUp(6+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(8+12)} onMouseUp={(e)=>this.onMouseUp(8+12)} onMouseOut={(e)=>this.onMouseUp(8+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(10+12)} onMouseUp={(e)=>this.onMouseUp(10+12)} onMouseOut={(e)=>this.onMouseUp(10+12)}></td>
						<td style={STYLE.keyNo}></td>
						
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(1+12+12)} onMouseUp={(e)=>this.onMouseUp(1+12+12)} onMouseOut={(e)=>this.onMouseUp(1+12+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(3+12+12)} onMouseUp={(e)=>this.onMouseUp(3+12+12)} onMouseOut={(e)=>this.onMouseUp(3+12+12)}></td>
						<td style={STYLE.keyNo}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(6+12+12)} onMouseUp={(e)=>this.onMouseUp(6+12+12)} onMouseOut={(e)=>this.onMouseUp(6+12+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(8+12+12)} onMouseUp={(e)=>this.onMouseUp(8+12+12)} onMouseOut={(e)=>this.onMouseUp(8+12+12)}></td>
						<td style={STYLE.keyBlack} onMouseDown={(e)=>this.onMouseDown(10+12+12)} onMouseUp={(e)=>this.onMouseUp(10+12+12)} onMouseOut={(e)=>this.onMouseUp(10+12+12)}></td>
						<td style={STYLE.keyNo}></td>						
					</tr>
				</tbody>
			</table>
		<table align="center">
				<tbody>
					<tr>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(0)} onMouseUp={(e)=>this.onMouseUp(0)} onMouseOut={(e)=>this.onMouseUp(0)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(2)} onMouseUp={(e)=>this.onMouseUp(2)} onMouseOut={(e)=>this.onMouseUp(2)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(4)} onMouseUp={(e)=>this.onMouseUp(4)} onMouseOut={(e)=>this.onMouseUp(4)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(5)} onMouseUp={(e)=>this.onMouseUp(5)} onMouseOut={(e)=>this.onMouseUp(5)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(7)} onMouseUp={(e)=>this.onMouseUp(7)} onMouseOut={(e)=>this.onMouseUp(7)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(9)} onMouseUp={(e)=>this.onMouseUp(9)} onMouseOut={(e)=>this.onMouseUp(9)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(11)} onMouseUp={(e)=>this.onMouseUp(11)} onMouseOut={(e)=>this.onMouseUp(11)}></td>
						
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(0+12)} onMouseUp={(e)=>this.onMouseUp(0+12)} onMouseOut={(e)=>this.onMouseUp(0+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(2+12)} onMouseUp={(e)=>this.onMouseUp(2+12)} onMouseOut={(e)=>this.onMouseUp(2+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(4+12)} onMouseUp={(e)=>this.onMouseUp(4+12)} onMouseOut={(e)=>this.onMouseUp(4+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(5+12)} onMouseUp={(e)=>this.onMouseUp(5+12)} onMouseOut={(e)=>this.onMouseUp(5+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(7+12)} onMouseUp={(e)=>this.onMouseUp(7+12)} onMouseOut={(e)=>this.onMouseUp(7+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(9+12)} onMouseUp={(e)=>this.onMouseUp(9+12)} onMouseOut={(e)=>this.onMouseUp(9+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(11+12)} onMouseUp={(e)=>this.onMouseUp(11+12)} onMouseOut={(e)=>this.onMouseUp(11+12)}></td>
						
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(0+12+12)} onMouseUp={(e)=>this.onMouseUp(0+12+12)} onMouseOut={(e)=>this.onMouseUp(0+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(2+12+12)} onMouseUp={(e)=>this.onMouseUp(2+12+12)} onMouseOut={(e)=>this.onMouseUp(2+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(4+12+12)} onMouseUp={(e)=>this.onMouseUp(4+12+12)} onMouseOut={(e)=>this.onMouseUp(4+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(5+12+12)} onMouseUp={(e)=>this.onMouseUp(5+12+12)} onMouseOut={(e)=>this.onMouseUp(5+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(7+12+12)} onMouseUp={(e)=>this.onMouseUp(7+12+12)} onMouseOut={(e)=>this.onMouseUp(7+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(9+12+12)} onMouseUp={(e)=>this.onMouseUp(9+12+12)} onMouseOut={(e)=>this.onMouseUp(9+12+12)}></td>
						<td style={STYLE.keyWhite} onMouseDown={(e)=>this.onMouseDown(11+12+12)} onMouseUp={(e)=>this.onMouseUp(11+12+12)} onMouseOut={(e)=>this.onMouseUp(11+12+12)}></td>
						
						<td style={STYLE.keyMargin}></td>
						
					</tr>
				</tbody>
			</table>
		<p>Component</p>
		<MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[this.state.selectedInstrument]} />	
		<hr/>
		<p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;
