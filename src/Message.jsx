import React, {Component} from 'react';

class Message extends Component {
  // getstyles: () => {
  //   return ;
  // }
  render() {
    let userStyles = {
      color: this.props.color
    }
    // console.log("Rendering <Message/>");
    if (this.props.username) {
      return (
        <div className="message">
            <span className="message-username" style={userStyles}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message">
            <span className="message-username" style={userStyles}>Annonymous</span>
            <span className="message-content">{this.props.content}</span>
        </div>
      );
    }
  }
}
export default Message;
