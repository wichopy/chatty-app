import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// const WebSocket = require('ws');
// const wsServer = new ws('ws://localhost:4000');
//start of App component class.
export default class App extends Component {
  //start of state constructor
  constructor(props) {
    super(props);
//initial state of app.jsx
    this.state = {
      currentUser: {
        name: '',
        id: ''
      },
      messages: [],
      currentUserCount: 0
    };
    //NOTIFICATION LIBRARY:
    //namechange - user change's his username in chatroom.
    //function for updating username
    this.updateUsername = (e) => {
      if (e.key === 'Enter') {
        if (e.target.value) {
          var newNotification = {
            type: 'postNotification',
            username: e.target.value,
            content: `${this.state.currentUser.id} changed username to ${e.target.value}`,
            code: 'namechange',
            userid: this.state.currentUser.id
          };
          this.socket.send(JSON.stringify(newNotification));
          this.setState({currentUser: {name: e.target.value}});
        }
      }
    }
    //function for updating message list.
    this.sendMessage = (e) => {
      if (e.key === 'Enter') {
        if (e.target.value){
          const newMessage = {
            username: this.state.currentUser.name,
            content: e.target.value,
            type: 'postMessage'
          }
          this.socket.send(JSON.stringify({
            username: newMessage.username,
            content: newMessage.content,
            type: 'postMessage'
          }));
        }
      }
    }
    //make one protocol for messages and one for notifications??
    this.newMessageFromServer = (data) => {
      // console.log("in new message from server function");
      // console.log(JSON.parse(data));
      let parsedData = JSON.parse(data);
      console.log(parsedData);
      switch(parsedData.type) {
        case 'incomingMessage': {
          const messages = this.state.messages.concat(parsedData);      // e.target.value = "";
          this.setState({messages : messages});
          break;
        }
        case 'incomingNotification': {
          if (parsedData.code === 'newuser'){
            console.log('new user connected');
            console.log(parsedData.content[0]);
            console.log(parsedData.content[1]);
            this.setState({
              currentUser: {
                id: parsedData.id, 
                name: ''
              }
            });
            this.setState({currentUserCount: parsedData.content[0]});
            console.log('verify setting of currentUserCount');
            parsedData.content = parsedData.content[1];
            console.log(parsedData.content);
          }
          const newNot = this.state.messages.concat(parsedData);
          this.setState({messages:newNot});
          break;
        }
        case 'systemUpdate': {
          console.log(parsedData.type)
          this.setState({currentUserCount: parsedData.content});
          break;
        }
        default:
          throw new Error('unknown event type' + parsedData.type);
      }
    }
  } //End of constructor
  
  //Websocket stuff
  componentDidMount() {
    console.log('i mounted to ws');
    // this.ws.addEventListener('open', function (event) {
    //   this.ws.send('Hello Server!');
    const ws = new WebSocket('ws://localhost:5000');
    this.socket = ws;

    this.socket.onopen = () => {
      console.log('Connected to server');
    }
    this.socket.onmessage = (event) => {
      // console.log(event.data);
      this.newMessageFromServer(event.data);
    }

    this.socket.onclose = () => {
      console.log("closing!");
      this.socket.send({
        type: 'postNotification',
        content: this.state.currentUser.id,
        code: 'logoff'
      });
    }
    // });
  }
  //Render stuff
  render() {
    if (this.state.currentUser.name) {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty </a>
              <span>
              <p>Hello {this.state.currentUser.name} ! </p>
              </span>
              <span>
                {this.state.currentUserCount} Users Online
              </span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
          currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage} 
          updateUsername={this.updateUsername}
        />
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span>
              <p>Why don't you log in! </p>
            </span>
            <span>
              {this.state.currentUserCount} Users Online
            </span>
          </nav>
          <MessageList messages={this.state.messages}/>
        <ChatBar 
          currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage} 
          updateUsername={this.updateUsername}
          />
        </div>
      );
    }
  }
} // end of constructor class.
