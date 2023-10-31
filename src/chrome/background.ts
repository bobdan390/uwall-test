// receive messages from inject.ts
// It have the extension's scope
// @ts-ignore
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  // sendResponse({ farewell: "goodbye" });
  try {
    const { isActive } = await chrome.storage.session.get("isActive");
    let { address } = await chrome.storage.session.get("address");
    let { displayAddress } = await chrome.storage.session.get("displayAddress");
    let { chainName } = await chrome.storage.session.get("chainName");
    let { networksInfo } = await chrome.storage.session.get("networksInfo");

    if (!address) {
      address = "";
    }

    if (!displayAddress) {
      displayAddress = "";
    }

    if (!chainName) {
      chainName = "Ethereum";
    }
    if (!networksInfo) {
      networksInfo = {
        Ethereum: {
          chainId: 5,
          rpcUrl: "https://rpc.ankr.com/eth_goerli",
        },
      };
    }

    switch (msg.type) {
      case "requestAccounts": {
        if (isActive) {
          chrome.windows.create({
            url: chrome.runtime.getURL(`index.html#/connect`),
            type: "popup",
            height: 600,
            width: 375,
            left: 0,
            top: 0,
          });
        } else {
          chrome.windows.create({
            url: chrome.runtime.getURL(`index.html#/unlock`),
            type: "popup",
            height: 600,
            width: 375,
            left: 0,
            top: 0,
          });
        }
        break;
      }
      case "sendTransaction": {
        if (isActive) {
          chrome.storage.session.set({ params: JSON.stringify(msg.msg) });

          chrome.windows.create({
            url: chrome.runtime.getURL(`index.html#/transaction`),
            type: "popup",
            height: 600,
            width: 375,
            left: 0,
            top: 0,
          });
        } else {
          chrome.windows.create({
            url: chrome.runtime.getURL(`index.html#/unlock`),
            type: "popup",
            height: 600,
            width: 375,
            left: 0,
            top: 0,
          });
        }
        break;
      }
      case "init":
        chrome.tabs.query(
          {
            active: true,
          },
          (tabs) => {
            tabs.forEach((tab) => {
              chrome.tabs.sendMessage(tab.id!, {
                type: "init",
                msg: {
                  address,
                  chainId: networksInfo[chainName].chainId,
                  rpcUrl: networksInfo[chainName].rpcUrl,
                },
              });
            });
          }
        );
        break;
    }
  } catch (error) {
    console.log(error);
  }
});
