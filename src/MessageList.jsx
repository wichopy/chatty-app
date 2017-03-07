import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props.messages);
    // console.log('Rendering <MessageList/>');
    return (
    <main className="messages">
      { 
        this.props.messages.map( (messageObj) => {
          return <Message key={messageObj.id} username={messageObj.username} content={messageObj.content} />
        })
        
      }
    </main>
    );
  }
}
export default MessageList;
