document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("group_name").addEventListener("click", group_name);
});

async function group_name() {
    var i_str = document.getElementsByClassName("i_str")[0];
    var o_str = document.getElementsByClassName("o_str")[0];
    var status = document.getElementById("status");
    status.style.display = "none";
    o_str.value = "";
    var get_data = i_str.value.match(/.+/g);
    for (const x of get_data) {
        var resp = await fetch(x);
        var text = await resp.text();
        var title = text.match(/(?<=<h2 class="_2yzk">).*?(?=<\/h2>)/g)[0];
        o_str.value += html_unescape(html_entities_decode(title))+"\n";
    }
    status.innerText = "完成";
    status.style.display = "";
}

// HTML实体还原
function html_entities_decode(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

// HTML转义还原
function html_unescape(str) {
    str = str.replace(/&#123;/g, "{");
    str = str.replace(/&#125;/g, "}");
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&#10;/g, "\n");
    return str;
}
