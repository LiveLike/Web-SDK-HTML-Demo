const hls = new Hls({ startPosition: 1 });
const main = document.querySelector("main");
const videoContainer = document.querySelector(".video-container");
const videoEl = document.querySelector("video");
// Instantiate sync strategy
const syncStrategy = new window.HlsJsSyncStrategy(hls, videoEl);

function startVideo(program) {
  // Ensure program has a stream_url
  if (program.stream_url) {
    // Load the stream_url using our sync strategy
    syncStrategy.hls.loadSource(program.stream_url);
    syncStrategy.hls.attachMedia(videoEl);
    syncStrategy.hls.on(Hls.Events.MANIFEST_PARSED, () => {});
    videoEl.play();
  } else {
    syncStrategy.hls.destroy();
  }
}

// When window is resized and video element changes size, resize chat height for correct scroll height.
function setupResizeObserver() {
  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const headerHeight = 64;
      const navHeight = 34;
      const videoContainerHeight = entry.contentRect.height;
      const nonChatHeight = headerHeight + navHeight + videoContainerHeight;
      main.style.setProperty("--chat-height", `calc(100% - ${nonChatHeight}px)`);
    });
  });
  resizeObserver.observe(videoContainer);
}

function setupVideo(program) {
  startVideo(program);
  setupResizeObserver();
}
