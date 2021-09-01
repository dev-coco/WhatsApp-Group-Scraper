var get_html = document.documentElement.outerHTML.replace(/invite\//g, "");
var get_data = unique(get_html.match(/https\:\/\/chat\.whatsapp.com\/[A-z0-9]{22}/g));
var str = [];
for (var i = 0; i < get_data.length; i++) {
    str += get_data[i] + "\n";
}

if (navigator.userAgent.indexOf('Firefox') >= 0) {
    create_box(str);
    alert(`已输出：${get_data.length}个WhatsApp小组链接`);
} else {
    copy(str);
    alert(`已复制：${get_data.length}个WhatsApp小组链接`);
}

function unique(get_data) {
    return Array.from(new Set(get_data))
}

function copy(str) {
    var input = document.createElement("textarea");
    document.body.appendChild(input);
    input.value = str;
    input.select();
    document.execCommand("Copy");
    input.remove();
}

function create_box(str) {
    if (document.getElementById("out_text")){
          console.log("yes");
        document.getElementById("out_text").value = str;
    } else {
        var para = document.createElement("textarea");
        var element = document.querySelector("body");
        element.appendChild(para);
        para.setAttribute("id", "out_text");
        para.setAttribute("style", "position: fixed;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);border:1px solid;padding:3px 12px;border-radius:10px;color:#fff;background-color:#99CCFF;z-index:9999;font-size:16px;width:640px;height:360px;");
        document.getElementById("out_text").value = str;
    }
}
