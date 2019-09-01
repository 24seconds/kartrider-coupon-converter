import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      convertedValue: '',
      snackbarClassname: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  async readText() {
    return await navigator.clipboard.readText();
  }

  onChange(e) {
    const value = e.target.value;
    const convertedValue = value.replace(/-/g, '');

    this.setState({
      value,
      convertedValue,
    });
  }

  async onPaste() {
    const value = await this.readText();
    console.log('text is ', value);

    this.onChange({ target: { value } });
  }

  onCopy() {
    const { convertedValue } = this.state;
    navigator.clipboard.writeText(convertedValue);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  showSnackbar() {
    this.onCopy();

    this.setState({
      snackbarClassname: 'show',
    });

    setTimeout(() => {
      this.setState({
        snackbarClassname: '',
      })
    }, 1500);
  }
  
  render() {
    const { value, convertedValue, snackbarClassname } = this.state;

    return (
      <div className="App">
        <h3> 카트라이더 쿠폰코드 변환하기</h3>
        <div>
          <p>쿠폰코드 입력</p>
          <input id='input1'
            type="text"
            value={ value }
            ref={ (input) =>{ this.nameInput = input }}
            onChange={ this.onChange } ></input>
          <button onClick={ this.onPaste.bind(this) } >붙여넣기</button>
        </div>
        <div>
          <p>변환된 쿠폰코드</p>
          <input id='input2'
            type="text"
            value={ convertedValue }
            readOnly={ true } />
          <button onClick={ this.showSnackbar.bind(this) }>복사하기</button>
        </div>
        <div id="snackbar" className={ snackbarClassname }>
          클립보드로 복사완료!
        </div>
      </div>
    );
  }
}

export default App;
