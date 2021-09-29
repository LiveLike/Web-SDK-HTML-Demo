const setupChat = (roomIds, program) => {
  const currentChat = document.querySelector(
    ".tab-pane.active > livelike-chat"
  );
  const unreadIcon = document.querySelector(".unread-icon");
  const chatRoomList = document.querySelector("#chat-list");
  const chatIconButton = document.querySelector("#open-chat-switcher");
  const createChatButton = document.querySelector("#createChatButton");

  chatIconButton.addEventListener('click', () => {
    unreadIcon.innerHTML = '';
  })

  const roomListenerCallback = (e) => {
    // If a message comes in to a chat room that is not currently active, increment the unread count
    currentChat.roomid !== e.roomId && unreadIcon.innerHTML++;
  };

  const switchChatRoomCallback = (e) => {
    // Change active chat room id
    currentChat.roomid = e.target.value;
  };

  const createChatRoomListItem = (chatroom) => {
    // Create new option for each chat room
    const opt = document.createElement("option");
    opt.setAttribute("value", chatroom.id);
    opt.setAttribute("class", "chat-option-item");
    // If chatroom id matches the currently active chatroom id, add the selected attribute
    chatroom.id === currentChat.roomid && opt.setAttribute("selected", "true");
    opt.innerHTML = chatroom.title || chatroom.id;
    // When selecting a new chat room from the option list, change the active chat room
    chatRoomList.addEventListener("change", switchChatRoomCallback);
    chatRoomList.appendChild(opt);
  };

  // Loop over list of room ids
  roomIds.forEach((roomId) => {
    // Add listener to track unread messages
    LiveLike.addMessageListener({ roomId }, roomListenerCallback);
    // Get chat room resource to create html elements
    LiveLike.getChatRoom({ roomId }).then(createChatRoomListItem);
  });

  const linkChatRoomToProgram = (chatroom) => {
    const url = `https://cf-blast.livelikecdn.com/api/v1/programs/${program.id}/chat-rooms/${chatroom.id}/`;
    return fetch(url, { method: "PUT" })
      .then((r) => r.json())
      .then((r) =>
        console.log(
          "Chatroom " +
            chatroom.id +
            " successfully linked to Program " +
            program.id
        )
      );
  };

  createChatButton.addEventListener("click", (e) => {
    // Get the text from the input the user entered for new chatroom title
    const chatTitleInput = document.querySelector("#chatTitleInput");
    const title = chatTitleInput.value;
    // Create new chatroom with set title.
    LiveLike.createChatRoom({ title }).then((chatroom) => {
      // Once chatroom is created, link chatroom to program, so it appears on our list of chatrooms when we reopen the room list
      linkChatRoomToProgram(chatroom);
      // Reset chat title input
      chatTitleInput.value = "";
      // Create a new option element for the chat room select
      createChatRoomListItem(chatroom);
      // Change the active chatroom to the chatroom just created
      switchChatRoomCallback({ target: { value: chatroom.id } });
    });
  });
};
