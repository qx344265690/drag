export function getItem(key) {
  if (
    localStorage.getItem(key) === undefined ||
    localStorage.getItem(key) === null
  ) {
    return localStorage.getItem(key);
  }
  if (
    localStorage.getItem(key)[0] === "{" ||
    localStorage.getItem(key)[0] === "["
  ) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
}

export function setItem(key, val) {
  let v = "";
  if (typeof val === "object") {
    v = JSON.stringify(val);
  } else {
    v = val.toString();
  }
  localStorage.setItem(key, v);
  const onStrogeChange = new CustomEvent("onStrogeChange", {
    detail: { key, value: val }
  });
  window.dispatchEvent(onStrogeChange);
}

export function deleteItem(key) {
  localStorage.removeItem(key);
  const onStrogeChange = new CustomEvent("onStrogeChange", {
    detail: { key, value: "" }
  });
  window.dispatchEvent(onStrogeChange);
}

export function clearAll() {
  localStorage.clear();
}
