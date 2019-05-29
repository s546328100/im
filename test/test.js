function queryString(JSON) {
  let temp = [];
  for (let k in JSON) {
    temp.push(k + '=' + encodeURIComponent(JSON[k]));
  }
  return temp.length ? '?' : '' + temp.join('&');
}

let s = {};

console.log(queryString(s));
