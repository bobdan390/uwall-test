/**
 * Read the data saved at 'key' in the browser's session storage
 * @param key key to get the data storaged
 * @returns (string)
 */
async function getSessionData(key: string) {
  const res = await chrome.storage.session.get([key]);
  return res[key];

  // return "/0x0dba6cf9258903819e8cb6ecd05645501cc27e1f73587fbd5baad65a7b42f120/";
  // return "";
}

/**
 * Write the 'value' data in the browser's session storage
 * @param key
 * @param value
 */
function setSessionData(key: string, value: string) {
  chrome.storage.session.set({ [key]: value });
}

export { getSessionData, setSessionData };
