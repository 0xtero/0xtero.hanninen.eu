document.addEventListener("DOMContentLoaded", function () {
    var tweets = false;

    function convert(el, url) {
        var m = url.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([\w-]{6,})/);
        if (m) {
            var w = document.createElement("div");
            w.className = "yt-embed";
            w.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + m[1] +
                '" loading="lazy" allowfullscreen title="YouTube video"></iframe>';
            el.replaceWith(w);
            return;
        }
        if (/(?:twitter|x)\.com\/\w+\/status\/\d+/.test(url)) {
            var bq = document.createElement("blockquote");
            bq.className = "twitter-tweet";
            var a = document.createElement("a");
            a.href = url;
            bq.appendChild(a);
            el.replaceWith(bq);
            tweets = true;
        }
    }

    // <a> tags whose text is the bare URL (kramdown <url> autolinks)
    document.querySelectorAll(".post-content a").forEach(function (a) {
        if (a.textContent.trim().replace(/\/$/, "") === a.href.replace(/\/$/, "")) convert(a, a.href);
    });

    // Paragraphs containing only a bare URL (plain paste)
    document.querySelectorAll(".post-content p").forEach(function (p) {
        var t = p.textContent.trim();
        if (/^https?:\/\/\S+$/.test(t)) convert(p, t);
    });

    if (tweets) {
        var s = document.createElement("script");
        s.src = "https://platform.twitter.com/widgets.js";
        s.async = true;
        document.body.appendChild(s);
    }
});
