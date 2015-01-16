var OlhoVivoApi = require('..');
var olhovivoApi = new OlhoVivoApi({
  token: process.env.SPTRANS_TOKEN
});

olhovivoApi.queryLines('bandeira')
  .then(function(lines) {
    console.log(lines);
  });
