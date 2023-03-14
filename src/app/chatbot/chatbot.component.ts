import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  public args: any;
  public state: any;
  public messages: any;
  public openButton: any;
  public chatBox: any;
  public sendButton: any;
  

  ngOnInit(): void {
    this.args = {
      openButton: document.querySelector('.chatbox_button'),
      chatBox: document.querySelector('.chatbox_support'),
      sendButton: document.querySelector('.send_button')
    }

    this.state = false;
    this.messages = [];
    this.display('');
  }

  display(keyup: any) {

    const { openButton, chatBox, sendButton } = this.args;

    var preMessage = '<div> <p style="width: fit-content; background: #E0E0E0; padding: 8px 12px; max-width: 70%; border-top-left-radius: 20px; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">Hello! I am Paddy, how may I help?</p> </div>';

    const chatmessage = chatBox.querySelector('.chatbox_messages');
    chatmessage.innerHTML = preMessage;

    // Open chatbot window
    openButton.addEventListener('click', () => this.toggleState(chatBox))

    //Send message to backend
    sendButton.addEventListener('click', () => this.onSendButton(preMessage, chatBox))
    
    // //If the user presses enter instead of clicking 'send', send message
    // if (keyup === "enter") {
    //   this.onSendButton(preMessage, chatBox)
    //   // Fixes bug where you couldn't close chat window after pressing enter
    //   this.state = false;
    // }
  }

  toggleState(chatbox: any) {
    console.log(this.state);
    this.state = !this.state;
  
    // Displays or hides chatbot window
    if (this.state) {
      chatbox.classList.add('chatbox--active')
    } else {
      chatbox.classList.remove('chatbox--active')
    }
  }

  onSendButton(preMessage: any, chatbox: any) { 
    var textField = chatbox.querySelector('input');
    let text1 = textField.value
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 }
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(r => r.json())
      .then(r => {
        let msg2 = { name: "Paddy", message: r.answer };
        this.messages.push(msg2);
        //Update chatbot window
        this.updateChatText(preMessage, chatbox)
        textField.value = ''

      }).catch((error) => {
        console.error('Error:', error);
        this.updateChatText(preMessage, chatbox)
        textField.value = ''
      });
  }

  updateChatText(preMessage: any, chatbox: any) {
    var html = '';
    this.messages.slice().reverse().forEach(function (item: any) {
      if (item.name === "Paddy") {
        //visitor (the chatbot)
        html += '<div style="width: fit-content; background: #E0E0E0; padding: 8px 12px; max-width: 70%; border-top-left-radius: 20px; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">'
        + item.message + '</div>'
      }
      else {
        //operator (me)
        html += '<div style="margin: 10px 0px 10px auto; width: fit-content; background: #005F50; padding: 8px 12px; max-width: 70%; border-top-left-radius: 20px; border-top-right-radius: 20px; border-bottom-left-radius: 20px; color: white;">'
        + item.message + '</div>'
      }
      console.log(html); 
    });

    //Attach pre message to conversation
    html += preMessage;
    
    const chatmessage = chatbox.querySelector('.chatbox_messages');
    chatmessage.innerHTML = html;
  }
}
