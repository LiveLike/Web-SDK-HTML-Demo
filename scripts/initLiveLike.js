function initLiveLike({ program, endpoint }) {
  return LiveLike.init({
    clientId: program.client_id,
    endpoint,
  }).then(profile => {
    setupCustomWidgets();
    setupProfile(profile);
    setupLeaderboard(program);
    setupLiveLikeElements(program);
  });
}
