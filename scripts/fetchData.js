function getParams() {
  let params = {},
    base = "https://cf-blast";
  if (window.location.search) {
    window.location.search.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      (m, key, value) => {
        params[key] = value;
      }
    );
  } else {
    params.env = window.location.hostname.split(".")[0].split("-")[1];
  }
  params.env && (base += "-" + params.env);
  endpoint = `${base}.livelikecdn.com/api/v1/`;
  return { endpoint, programid: params.program };
}

function fetchData() {
  const params = getParams();
  if (params.programid) {
    fetch(params.endpoint + "programs/" + params.programid + "/")
      .then((p) => p.json())
      .then((program) => {
        setupVideo(program);
        return initLiveLike({
          program,
          endpoint: params.endpoint,
        })
      });
  }
}
