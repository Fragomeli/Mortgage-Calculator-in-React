import React from 'react';
import ReactDOM from 'react-dom'
// import "../css/style.less"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      rate: 0,
      term: 0,
      output: ''
    };

    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

    //-----------COULD THE ABOVE BE SIMPLIFIED --->
    //  handleChange(event) {
    //   event.preventDefault(event)
    //   this.setState({
    //   [event.target.name]:event.target.value,
    //  })
    // }

    this.calculatePayment = this.calculatePayment.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }
  //---------FUNCTIONS-------------------------------------->

  handleBalanceChange(e) {
    this.setState({ balance: e.target.value });
  }
  handleRateChange(e) {
    this.setState({ rate: e.target.value });
  }
  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  calculatePayment(e) {
    e.preventDefault();
    let P = parseFloat(this.state.balance);
    let r = parseFloat(this.state.rate) / 100 / 12;
    let n = parseFloat(this.state.term) * 12;
    let num = r * Math.pow(1 + r, n);
    let den = Math.pow(1 + r, n) - 1;
    //let M = P*((R*Math.pow((1+R),N))/ (Math.pow((1+r),n)-1));
    let M = P * num / den;

    this.setState({ output: M.toFixed(2) });
  }

  // clearFormonClick(e) {
  //   this.form.reset(e)
  // }

  clearForm(e) {
    e.preventDefault();
    console.log("Form should be cleared now");

    this.setState({
      balance: 0,
      rate: 0,
      term: 0,
      output: ''
    });
  }

  //------------RENDER---------------------------------->
  render() {
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group">
            <h3 className='title text-center'>Mortgage Calculator</h3>
            <h3>Calculate your monthly mortgage payment</h3>
          </div>

          {/* //-------------FORMAT FOR STYLING USING BOOTSRAP 4----------> */}
          <div className="form-group">
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-default">$</span>
                </div>
                {/* //----------INPUT FORMAT FOR "BALANCE"-------------------------------> */}
                <input onChange={this.handleBalanceChange}
                  value={this.state.balance}
                  className="form-control"
                  aria-label="Default" aria-describedby='imputGroup-sizing-default'
                  name="balance"
                  type="number"
                  placeholder="Enter mortgage balance" />
              </div>
            </div>
          </div>
          {/* //--------------INPUT FORMAT FOR "RATE" -------------------------------> */}
          <div className="form-group">
            <div className="row">
              {/* <div className = "col"> */}
              <div className="input-group">
                <input onChange={this.handleRateChange}
                  defaultValue={this.state.rate}
                  className="form-control"
                  aria-label="Default" aria-describedby='inputGroup-sizing-default'
                  id="number"
                  name="rate"
                  type="number"
                  step="0.01"
                  placeholder="Enter monthly interest rate" />
                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* //------------------SELECTOR FORMAT FOR "TERM"------------------------------> */}
          <div className="form-group">
            <div className="row">
              <div className="input-group">
                <select onChange={this.handleTermChange}
                  defaultValue={this.state.term}
                  className="custom-select form-control select"
                  aria-label="Default" aria-describedby="inputGroup-sizing-default"
                  name="term">
                  <option value="Select Term" > Select Term</option>
                  <option value="15" > 15 years </option>
                  <option value="30" > 30 years </option>
                </select>
              </div>
            </div>
          </div>
          {/* //---------------------SUBMIT AND CALCULATE BUTTON--------------------------------> */}
          <div className="row">
            <button onClick={this.calculatePayment}
              className="btn btn-outline-secondary form-control"
              type="submit"
              name="submit">CALCULATE</button>
          </div>
          {/* //-----------------------------OUTPUT FIELD----------------------------------------> */}

          <div className="row">
            <h3>
              <div name="output">
                Your monthly payment is ${this.state.output}
              </div>
            </h3>
          </div>
          {/* //------------------------ CLEAR FORM BUTTON------------------------------------------>*/}

          <div className="row">
            <button onClick={this.clearForm}
              className="btn btn-outline-secondary form-control">Clear Form</button>
          </div>


        </form>
      </div>
    );
  }
}  
