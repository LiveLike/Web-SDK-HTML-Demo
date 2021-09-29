const leaderboardPanel = document.querySelector("#leaderboard-panel");
const openLeaderboard = document.querySelector("#open-leaderboard");
const closeLeaderboard = document.querySelector("#close-leaderboard");

const outsideClick = () => {
  const outsideClickCallback = (e) => {
    // If the close leaderboard button is clicked, or anywhere outside of the leaderboard
    // is clicked, close the leaderboard and remove the listener
    if (e.target === closeLeaderboard || !leaderboardPanel.contains(e.target)) {
      leaderboardPanel.classList.remove("active");
      document.removeEventListener("click", outsideClickCallback);
    }
  };
  // Wait to add the outsideClick callback to prevent it from firing on leaderboard open click
  requestAnimationFrame(() => {
    leaderboardPanel.classList.add("active");
    document.addEventListener("click", outsideClickCallback);
  });
};

// Add click listener to leaderboard open button
openLeaderboard.addEventListener("click", outsideClick);
