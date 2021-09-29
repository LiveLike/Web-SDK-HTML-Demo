const setupProfile = profile => {
  // Set the input as the current user profile nickname
  const nickname = document.querySelector('#profileNickname');
  nickname.value = profile.nickname;

  const updateNickname = document.querySelector('#updateNickname');
  const updatedMessage = document.querySelector(
    '.request-result-message#profile-results'
  );

  const updateProfile = options =>
    LiveLike.updateUserProfile({
      options,
      accessToken: LiveLike.userProfile.access_token,
    });

  const setUpdatedMessage = (type, message, el) => {
    const currentMessageClass = el.className;
    el.className = currentMessageClass + ' ' + type;
    el.innerHTML = message;
  };

  updateNickname.addEventListener('click', () => {
    // If the current input value is not the same as the current user profile nickname, update.
    // When update is successful, show success message. If error, show error message.
    nickname.value !== LiveLike.userProfile.nickname &&
      updateProfile({ nickname: nickname.value })
        .then(() => setUpdatedMessage('success', 'Updated!', updatedMessage))
        .catch(() => setUpdatedMessage('error', 'Error', updatedMessage));
  });

  const setChatElAvatar = avatarUrl => {
    if (avatarUrl) {
      const profileAvatar = document.querySelector('#my-profile-image');
      profileAvatar.setAttribute('src', avatarUrl);
      const chats = document.querySelectorAll('livelike-chat');
      chats.forEach(el => el.setAttribute('avatarurl', avatarUrl));
    }
  };

  // If the is a saved avatar in profile's custom_data, parse it.
  const customData = LiveLike.userProfile.custom_data;
  const parsedCustomData = customData && JSON.parse(customData);
  const avatarUrl = parsedCustomData && parsedCustomData.avatarUrl;
  // Set livelike-chat's `avatarurl` attribute as the saved avatarUrl if it exists.
  setChatElAvatar(avatarUrl);

  const avatars = document.querySelectorAll('#avatarImage');

  const avatarSelectCallback = e => {
    // When avatar image is clicked, loop through all, remove the old `selected` attribute
    // and add a new `selected` attribute to the image that was selected.
    avatars.forEach(el => {
      if (e.target !== el && el.parentElement.getAttribute('selected')) {
        el.parentElement.removeAttribute('selected');
      }
      e.target.parentElement.setAttribute('selected', 'true');
    });
    // Then update the LiveLike user profile with the selected avatar img src
    updateProfile({
      custom_data: JSON.stringify({ avatarUrl: e.target.src }),
    });
    // Then set the livelike-chat's `avatarurl` attribute with the selected img src.
    setChatElAvatar(e.target.src);
  };

  // If there is a saved avatarUrl in the profile's customData, find matching avatar img
  // and set the `selected` attribute. Then attach click listener.
  avatars.forEach(el => {
    if (avatarUrl && el.src === avatarUrl) {
      el.parentElement.setAttribute('selected', 'true');
    }
    el.addEventListener('click', avatarSelectCallback);
  });
};