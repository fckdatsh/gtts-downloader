chrome.devtools.network.onRequestFinished.addListener(request => {
  const errorDiv = document.querySelector('div#error');
  errorDiv.style.display = 'none';
  request.getContent((body) => {
    errorDiv.style.display = 'none';
    if (!!body) {
      if (request.request && request.request.url) {
        if (request.request.url.includes('https://texttospeech.googleapis.com')) {
          document.querySelector('a#download').href = "data:audio/wav; base64, " + JSON.parse(body).audioContent;
          document.querySelector('a#download').style.display = 'block';
          document.querySelector('#imageDance').style.display = 'block';
          chrome.runtime.sendMessage({
            response: JSON.parse(body)
          });
        }
      }
    } else {
      errorDiv.style.display = 'block';
    }
  });
});