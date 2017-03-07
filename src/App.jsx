import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
//initial state of app.jsx
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
//function for updating message list.
    this.updateMessageList = (e) => {
      if (e.key === 'Enter') {
        if (e.target.value){
          const newMessage = {
            id: this.state.messages.length+1,
            username: this.state.currentUser.name,
            content: e.target.value
          }
          const messages = this.state.messages.concat(newMessage);
          // e.target.value = "";
          this.setState({messages: messages});
          
        }
      }
    }
  }
// //testing a rende rof a new message staticly.
//   componentDidMount() {
//     console.log('componentDidMount <App />');
//     setTimeout(() => {
//       console.log('Simulating incoming message');
//       // Add a new message to the list of messages in the data store
//       const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
//       const messages = this.state.messages.concat(newMessage)
//       // Update the state of the app component.
//       // Calling setState will trigger a call to render() in App and all child components.
//       this.setState({messages: messages})
//     }, 3000);
//   }
  
  render() {
    // console.log('rendinger <App />');
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p>Hello {this.state.currentUser.name} ! </p>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar 
        currentUser={this.state.currentUser.name}
        updateMessageList={this.updateMessageList} 
        />
      </div>
    );
  }
}
