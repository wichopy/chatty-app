import React, {Component} from 'react';
    
class ChatBar extends Component {

  render() {
    // console.log("Rendering <ChatBar/>");
    return (
    <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" 
        defaultValue={this.props.currentUser}  //immutable so set to defaultValue
        />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          type="text"
          // value = {this.props.newMessage}
          onKeyPress={this.props.updateMessageList}
        />
    </footer>
    );
  }
}
export default ChatBar;
