import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

//start of App component class.
export default class App extends Component {
//start of state constructor
  constructor(props) {
    super(props);
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
          let userUpdateVar = this.state.currentUser;
          userUpdateVar.name = e.target.value;
          this.setState({currentUser: userUpdateVar});
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
            type: 'postMessage',
            userid: this.state.currentUser.id
          }
          this.socket.send(JSON.stringify(newMessage));
        }
      }
    }
    //make one protocol for messages and one for notifications??
    this.newMessageFromServer = (data) => {
      let parsedData = JSON.parse(data);
      switch(parsedData.type) {
        case 'incomingMessage': {
          const messages = this.state.messages.concat(parsedData);      // e.target.value = "";
          this.setState({messages : messages});
          break;
        }
        case 'incomingNotification': {
          if (parsedData.code === 'newuser'){
            console.log('new user connected');
            this.setState({
              currentUser: {
                id: parsedData.id, 
                name: ''
              }
            });
            this.setState({currentUserCount: parsedData.content[0]});
            parsedData.content = parsedData.content[1];
          }
          if (parsedData.code === 'addUserName'){
            let currentUser = this.state.currentUser;
            this.setState({currentUser: currentUser});
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
  } 
//End of constructor
//***************** */
//Websocket stuff
  componentDidMount() {
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
      console.log('closing socket!');
    }
  }
//end of web socket stuff
//**************** */
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
          <MessageList 
          messages={this.state.messages}
          />
        <ChatBar 
          currentUser={this.state.currentUser.name}
          sendMessage={this.sendMessage} 
          updateUsername={this.updateUsername}
          />
        </div>
      );
    }
  }
//end of render stuff
//************
} // end of class.
