export function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) })
  chrome.runtime.sendMessage({message: 'reload'})
}
