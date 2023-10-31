/**
 * Read the data saved at 'key' in the browser's local[persistent] storage
 * @param key key to get the data storaged
 * @returns
 */
async function getData(key: string) {
  let res = await chrome.storage.local.get([key]);
  return res[key];
  // return "";
}

/**
 * Write the 'value' data in the browser's local[persistent] storage
 * @param key
 * @param value
 */
function setData(key: string, value: string) {
  chrome.storage.local.set({ [key]: value });
}

export { getData, setData };
