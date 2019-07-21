
var summary = 22;
var ry = "<i><h4>CÙNG CHUYÊN MỤC</h4></i>";
rn = "<h5>Không có bài cùng chuyên mục</h5>";
function stripHtmlTags(e, r) {
    return e["replace"](/<.*?>/gi, "")["split"](/\s+/)["slice"](0, r - 1)["join"](" ")
}

function bintiz(e, r, t, s, i) {
    var n = t,
        r = r,
        l = document["getElementById"](e),
        m = l["innerHTML"];
    if (/<!--\s*more\s*-->/ ["test"](m)) {
        l["innerHTML"] = getSummaryLikeWP(e)
    } else {
        {
            var c = ""
        }
        var o = "<p>" + stripHtmlTags(m, summary) + "... </p>";
        l["innerHTML"] = o;
    };
}
rcomment = "comments";
rdisable = "disable comments";
commentYN = "no";
var dw = "";
titles = new Array;
titlesNum = 0;
urls = new Array;
timeR = new Array;
thumb = new Array;
commentsNum = new Array;
comments = new Array;

function related_results_labels(c) {
    for (var b = 0; b < c.feed.entry.length; b++) {
        var d = c.feed.entry[b];
        titles[titlesNum] = d.title.$t;
        for (var a = 0; a < d.link.length; a++) {
            if ("thr$total" in d) commentsNum[titlesNum] = d.thr$total.$t + " " + rcomment;
            else commentsNum[titlesNum] = rdisable;
            if (d.link[a].rel == "alternate") {
                urls[titlesNum] = d.link[a].href;
                timeR[titlesNum] = d.published.$t;
                if ("media$thumbnail" in d) thumb[titlesNum] = d.media$thumbnail.url;
                else thumb[titlesNum] = "https://2.bp.blogspot.com/-pAkyABlSI9I/V5Vb3h5bgGI/AAAAAAAAEEg/03XLR_fUHfciuaylJJCi1GxDG2Lw9WqVwCLcB/s320/couper.jpg";
                titlesNum++;
                break
            }
        }
    }
}

function removeRelatedDuplicates() {
    var b = new Array(0);
    c = new Array(0);
    e = new Array(0);
    f = new Array(0);
    g = new Array(0);
    for (var a = 0; a < urls.length; a++)
        if (!contains(b, urls[a])) {
            b.length += 1;
            b[b.length - 1] = urls[a];
            c.length += 1;
            c[c.length - 1] = titles[a];
            e.length += 1;
            e[e.length - 1] = timeR[a];
            f.length += 1;
            f[f.length - 1] = thumb[a];
            g.length += 1;
            g[g.length - 1] = commentsNum[a]
        }
    urls = b;
    titles = c;
    timeR = e;
    thumb = f;
    commentsNum = g
}

function contains(b, d) {
    for (var c = 0; c < b.length; c++)
        if (b[c] == d) return true;
    return false
}

function printRelatedLabels(a) {
    var y = a.indexOf("?m=0");
    if (y != -1) a = a.replace(/\?m=0/g, "");
    for (var b = 0; b < urls.length; b++)
        if (urls[b] == a) {
            urls.splice(b, 1);
            titles.splice(b, 1);
            timeR.splice(b, 1);
            thumb.splice(b, 1);
            commentsNum.splice(b, 1)
        }
    var c = Math.floor((titles.length - 1) * Math.random());
    var b = 0;
    if (titles.length == 0) dw += rn;
    else {
        dw += ry;
        dw += "<ul>";
        while (b < titles.length && b < 20 && b < maxresults) {
            if (y != -1) urls[c] = urls[c] + "?m=0";
            if (commentYN == "yes") comments[c] = " - " + commentsNum[c];
            else comments[c] = "";
            dw += '<li><a href="' + urls[c] + '"><div class="bimb"><img src="' + thumb[c].replace(/\/s72\-c/, "/s" + size + "") + '"/><span class="overlay"/></div></a><h3><a href="' + urls[c] + '">' + titles[c] + "</a></h3></li></div>";
            if (c < titles.length - 1) c++;
            else c = 0;
            b++
        }
        dw += "</ul>"
    }
    urls.splice(0, urls.length);
    titles.splice(0, titles.length);
    document.getElementById("related-article").innerHTML = dw
};
