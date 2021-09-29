function setupWidgetElements(program) {
  const popupWidgetEl = document.querySelector("livelike-widgets[id=pop-up]");
  const timelineEl = document.querySelector("livelike-widgets[id=timeline]");

  popupWidgetEl.programid = program.id;
  timelineEl.programid = program.id;
}

function setupChatElements(program) {
  const influencerChatEl = document.querySelector(
    "livelike-chat[id=influencer]"
  );
  const influencerTabNav = document.querySelector("#private-chat-tab");
  const influencerTabPane = influencerChatEl.parentElement;
  const influencerNavItem = influencerTabNav.parentElement;

  let publicChatId;
  let influencerChatId;

  if (program.default_chat_room && program.default_chat_room.id) {
    publicChatId = program.default_chat_room.id;
  }

  if (program.chat_rooms && program.chat_rooms.length > 0) {
    const publicRoomIds = [];
    program.chat_rooms.forEach((c) => {
      if (!influencerChatId && c.content_filter === "producer") {
        influencerChatId = c.id;
      }
      if (c.content_filter !== "producer") {
        !publicChatId && (publicChatId = c.id);
        publicRoomIds.push(c.id);
      }
    });
    setupChat(publicRoomIds, program);
  }

  if (influencerChatId) {
    influencerChatEl.roomid = influencerChatId;
  } else {
    influencerNavItem.remove();
    influencerTabPane.remove();
  }

  const publicChatEl = document.querySelector("livelike-chat[id=public]");
  publicChatEl.roomid = publicChatId;
}

function setupLiveLikeElements(program){
  setupChatElements(program);
  setupWidgetElements(program)
}