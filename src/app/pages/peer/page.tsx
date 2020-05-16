import React, { useState } from "react";
import SearchBox from "../../../components/searchBox/searchBox";
import Table from "../../../components/table/table";
import "./peer.css";

const Peer: React.FC = () => {
  const [peer, setPeer] = useState<string>("");

  const getPeer = (peerString: string) => {
    setPeer(peerString);
  };

  return (
    <div>
      <div className="searchBoxDiv">
        <div className="searchBox">
          <p>Select a Peer to Compare</p>
          <SearchBox pVal={getPeer} />
        </div>
      </div>
      <div className="PeerTable">
        <Table selectedPeer={peer} />
      </div>
    </div>
  );
};

export default Peer;
