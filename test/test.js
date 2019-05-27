function(e) {
  if (M(),
  B)
      return void e.preventDefault();
  var t = e.keyCode;
  if (t == 13) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
          var n = "<br>";
          if (!f.browser.msie && window.getSelection) {
              var i = window.getSelection().focusNode.nextSibling;
              do
                  if (!i || i.nodeValue || "BR" == i.tagName)
                      break;
              while (i = i.nextSibling);i || (n += n)
          }
          a.insertToEditArea(n, !0),
          x.scrollTop = x.scrollHeight
      } else
          a.sendTextMessage();
      e.preventDefault()
  }
  83 == t && e.altKey && (a.sendTextMessage(),
  e.preventDefault()),
  (t >= 65 && t <= 111 || t >= 186 && t <= 222) && u.close()
}

let f = {
  browser: function() {
    var e, t = navigator.userAgent.toLowerCase();
    if (null != t.match(/trident/))
        e = {
            browser: "msie",
            version: null != t.match(/msie ([\d.]+)/) ? t.match(/msie ([\d.]+)/)[1] : t.match(/rv:([\d.]+)/)[1]
        };
    else {
        var a = /(msie) ([\w.]+)/.exec(t) || /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
        e = {
            browser: a[1] || "",
            version: a[2] || "0"
        }
    }
    var n = {};
    return e.browser && (n[e.browser] = !0,
    n.version = e.version),
    n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0),
    n
  }()
}
