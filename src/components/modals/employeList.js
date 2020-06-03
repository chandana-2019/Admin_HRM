import React, { Component } from 'react'

export default class employeList extends Component {
   
    constructor(props) {
        console.log("Props - ", props);
        super(props);
        this.state = {
          modalVisible: false
        };
        this.openModal = this.openModal.bind(this);
      }
      openModal() {
        console.log("Open modal called ", this.state.modalVisible);
        const modalVisible = !this.state.modalVisible;
        this.setState({
          modalVisible
        });
      }
      render() {
        let styles = this.state.modalVisible
          ? { display: "block" }
          : { display: "none" };
        return (
          <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button
              type="button"
              onClick={this.openModal}
              className="btn btn-info btn-lg"
            >
              Open Modal
            </button>
            <div
              id="myModal"
              className="modal fade in"
              role="dialog"
              style={styles}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      onClick={this.openModal}
                      className="close"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Modal Header</h4>
                  </div>
                  <div className="modal-body">
                    <p>Some text in the modal.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={this.openModal}
                      type="button"
                      className="btn btn-default"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
}
