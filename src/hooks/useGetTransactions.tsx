import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { utils } from "ethers";
import { AbiItem } from "web3-utils";

import { timeConverter, erc20Interface, getData } from "~/utils";
import { EventObject } from "~/types";

export function useGetTransactions(contractAddress: string, address: string, decimals: string) {
  const [events, setEvents] = useState<EventObject[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const update = useCallback(async () => {
    setLoading(true);
    const providerUrl = await getData("provider");
    const web3 = new Web3(providerUrl);
    const contract = new web3.eth.Contract(erc20Interface as unknown as AbiItem, contractAddress);
    let myEvents: EventObject[] = [];
    let id: number = 0;

    try {
      let events = await contract.getPastEvents("Transfer", {
        filter: { ["src"]: address },
        fromBlock: 0,
        toBlock: "latest",
      });

      let events2 = await contract.getPastEvents("Transfer", {
        filter: { ["dst"]: address },
        fromBlock: 0,
        toBlock: "latest",
      });

      let events3 = await contract.getPastEvents("Transfer", {
        filter: { ["from"]: address },
        fromBlock: 0,
        toBlock: "latest",
      });

      let events4 = await contract.getPastEvents("Transfer", {
        filter: { ["to"]: address },
        fromBlock: 0,
        toBlock: "latest",
      });

      events = events.concat(events2);
      events = events.concat(events3);
      events = events.concat(events4);

      events.forEach(async (event) => {
        const time = await web3.eth.getBlock(event.blockNumber);
        const formattedTime = timeConverter(Number.parseInt(time.timestamp as string));
        myEvents = myEvents.concat({
          id: id,
          from: event.returnValues[0],
          to: event.returnValues[1],
          amount: utils.formatUnits(event.returnValues[2], decimals),
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          timestamp: formattedTime,
        });
        id++;
        myEvents.sort((a, b) => b.blockNumber - a.blockNumber);
        setEvents(myEvents);
      });
    } catch (err) {
      console.log("Error fetching events", err);
    }

    setLoading(false);
    setReady(true);
  }, []);

  useEffect(() => {
    update();
  }, [update]);

  return {
    update,
    events,
    ready,
    loading,
  };
}
