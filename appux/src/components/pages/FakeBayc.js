import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { Link } from "react-router-dom";
import NFTContract from '../contractJson/fakeBayc.json';
import Navbar from '../Navbar';

function FakeBayc() {
    const [infos, setInfos] = useState ({
        Name: "",
        TotalNumberOfToken: 0,
    });
    const [isClaimed, setClaimed] = useState(false);

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x1dA89342716B14602664626CD3482b47D5C2005E";

    var contract = new web3.eth.Contract(abi, address);


    async function getInfo() {
        let name = await contract.methods.name().call();
        let supply = await contract.methods.tokenCounter().call();
        setInfos ({
            Name: name,
            TotalNumberOfToken: supply,
        })
    }

    async function claimToken() {
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        let selectedAccount = account[0];
        await contract.methods.claimAToken().send({from: selectedAccount}).then(console.log && setClaimed(true))
    }

    useEffect(() => {
        getInfo();
    })

    return (
    <div className="page">
        <Navbar/>
        <div className="page_header">
            <h1>Fake Bayc Page</h1>
        </div>
        <div className="page_body">
            <p><b>Name:</b> {infos.Name}</p>
            <p><b>Total Number of Token:</b> {infos.TotalNumberOfToken}</p>
        </div>
        <div className="page_body">
            <button className="page_button" onClick={claimToken}>Claim new token</button>
            <br />
            {isClaimed && (
                <Link to={`/fakeBayc/${infos.TotalNumberOfToken - 1}`}>Get token infos</Link>
            )}
        </div>
    </div>
    );
}
export default FakeBayc;