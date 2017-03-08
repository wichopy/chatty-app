import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props.messages);
    // console.log('Rendering <MessageList/>');
    return (
    <main className="messages">
      { 
        this.props.messages.map( (messageObj) => {
          if (messageObj.type == 'incomingMessage') {
            return <Message key={messageObj.id} username={messageObj.username} content={messageObj.content} />
          }
          if (messageObj.type == 'incomingNotification'){
            return <Notification  key={messageObj.id} username={messageObj.username} content={messageObj.content} />
          }
        })
      }
    </main>
    );
  }
}
export default MessageList;
