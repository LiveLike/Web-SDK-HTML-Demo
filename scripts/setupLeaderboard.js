function setupLeaderboard(program) {
  const buildProfileRank = (leaderboardId) =>
    LiveLike.getLeaderboardProfileRank({
      leaderboardId,
      profileId: LiveLike.userProfile.id,
    })
      .then((profileRank) => {
        // If rank and points element already exist, update their values
        const rankEl = document.querySelector(".profile-list-item > .rank");
        const ptsEl = document.querySelector(".profile-list-item > .pts");
        if (ptsEl && rankEl) {
          ptsEl.innerHTML = `${profileRank.score} pts`;
          rankEl.innerHTML = `#${profileRank.rank}`;
        } else {
          // If rank and points don't already exist, create the elements and attach them
          const stats = document.querySelector(".profile-stats");
          const rankItem = document.createElement("li");
          rankItem.setAttribute("class", "profile-list-item");
          rankItem.innerHTML = `
            <div class="rank">#${profileRank.rank}</div>
            <div class="pts">${profileRank.score} pts</div>
          `;
          stats.appendChild(rankItem);
        }
      })
      .catch(() => console.log("Current user not a part of leaderboard yet."));

  const buildLeaderboard = (leaderboardId) => {
    LiveLike.getLeaderboardEntries({
      leaderboardId,
    }).then((lb) => {
      const lbContainer = document.querySelector(".leaderboard-list-container");

      // If leaderboard items already exist, remove them to re-build on leaderboard update
      lbContainer.children.length > 0 &&
        Array.from(lbContainer.children).forEach((el) => el.remove());

      // Loop through leaderboard entries to create list items for each entry
      lb.entries.forEach((entry) => {
        const lbItem = document.createElement("li");
        lbItem.setAttribute("class", "list-item");
        lbItem.innerHTML = `
          <div class="rank">${entry.rank}</div>
          <div class="name">${entry.profile_nickname}</div>
          <div class="pts">${entry.score}</div>
        `;
        lbContainer.appendChild(lbItem);
      });
    });
  };

  const leaderboardId =
    program.leaderboards &&
    program.leaderboards.length > 0 &&
    program.leaderboards[0].id;

  if (leaderboardId) {
    buildLeaderboard(leaderboardId);
    buildProfileRank(leaderboardId);
    // When a widget is dismissed, we update the leaderboard to show updated ranks and points
    document.addEventListener("beforewidgetdetached", () => {
      buildLeaderboard(leaderboardId);
      buildProfileRank(leaderboardId);
    });
  }
}
