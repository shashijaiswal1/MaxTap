var timing;
function ads(dt, i) {
    console.log(dt[i]["video_id"] + " " + dt[i]["ad_id"]);
}
function stop(timing, i) {
    clearInterval(timing);
}
function start(data, i) {
    timing = setInterval(ads, 1000, data, i);
    setTimeout(stop, (data[i]["ad_end_time"]) * 1000, timing, i);
}
function getData() {
    url = "https://storage.googleapis.com/publicmaxtap-prod.appspot.com/data/ads_data_assignment.json"
    fetch(url).then((response) => {
        return response.json();
    })
        .then(function (data) {
            var i = 0;
            while (i < 3) {
                setTimeout(start, data[i]["ad_start_time"], data, i);
                ++i;
            }
        }

        )
}

var videoPlayer = document.getElementById('videoPlayer');

videoPlayer.firstChild.nodeValue = 'Pause';
videoPlayer.addEventListener('click', function () {
    if (videoPlayer.paused == false) {
        videoPlayer.pause();
        videoPlayer.firstChild.nodeValue = 'Play';
    } else {
        videoPlayer.play();
        getData();
        videoPlayer.firstChild.nodeValue = 'Pause';
    }
});

