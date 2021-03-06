import React, {Component} from 'react';
 
/**
 * 
 * 
 * @class ChatBar
 * @extends {Component}
 */
class ChatBar extends Component {

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.sendMessage(e);
      e.target.value=""; // clear text box after sending message.
    }
  }

  render() {
    return (
    <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          type="text"
          // defaultValue={this.props.currentUser}  //immutable so set to defaultValue
          onKeyPress={this.props.updateUsername}
        />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER"
          type="text"
          onKeyPress={this._handleKeyPress}
        />
    </footer>
    );
  }
}
export default ChatBar;
