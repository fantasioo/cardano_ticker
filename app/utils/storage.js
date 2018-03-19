export function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

export function setBadge(todos) {
  if (chrome.browserAction) {
    const count = todos.filter(todo => !todo.marked).length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}
