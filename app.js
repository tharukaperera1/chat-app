//document.getElementById('btnMessage').addEventListener('click', addMessage);

// function addMessage() {
//     const userInput = document.getElementById('txtMessage').value;

//     // Find the chat-wrapper container
//     const chatWrapper = document.querySelector('.chat-wrapper');
//     const selectUser = document.getElementById('selectUser').value;

//     let messageContent = "";

//     // Create the appropriate message content based on the selected user
//     if (selectUser === "me") {
//         messageContent = `
//         <div class="box-one">
//             <h1>${userInput}</h1>
//         </div>
//         `;
//     } else {
//         messageContent = `
//         <div class="box-two">
//             <h1>${userInput}</h1>
//         </div>
//         `;
//     }

//     // Append the message content to the chat-wrapper
//     chatWrapper.innerHTML += messageContent;

//     // Clear the input field after the message is sent
//     document.getElementById('txtMessage').value = '';
// }

var md = window.markdownit();
document.getElementById('btnMessage').addEventListener('click', addMessage);

function addMessage() {
    const userInput = document.getElementById('txtMessage').value.trim(); // Trim to remove extra spaces
    const chatWrapper = document.getElementById('chat-wrapper');
    const selectedUser = document.getElementById('selectUser').value;

    if (userInput === "") {
        alert("Please enter a message.");
        return;
    }

    let messageContent;

    if (selectedUser === "friend") {
        messageContent = `
        <div class="box-one">
            <h1>${userInput}</h1>
        </div>
        `;
    } else {
        messageContent = `
        <div class="box-two">
            <h1>${userInput}</h1>
        </div>
        `;
    }

    // Append the new message to the chat-wrapper
    chatWrapper.innerHTML += messageContent;

    // Clear the input field
    document.getElementById('txtMessage').value = '';

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text": userInput
        }
      ]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA4Czz9vPPFySOaiq8t1qxQ2eoaBHcBFPU", requestOptions)
  .then((response) => response.json())
  .then((result) => {
   // console.log(result.candidates[0].content.parts[0].text)
   // document.getElementById("txtMessage").innerHTML+=
       const aiResponse = result.candidates[0].content.parts[0].text;
        const aiMessageContent = 
         `
        <div class="box-one
        ">
            <h1>${md.render(aiResponse)}</h1>
        </div>
        `;
        chatWrapper.innerHTML += aiMessageContent
  })
  .catch((error) => console.error(error));
}



  