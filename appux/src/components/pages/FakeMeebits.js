import React, {useEffect, useState} from 'react';
import Web3 from 'web3'
import {Link, useNavigate} from "react-router-dom";
import NFTContract from "../contractJson/fakeMeebits.json";

function FakeMeebits() {
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [isAccessible, setAccess] = useState();

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0xD1d148Be044AEB4948B48A03BeA2874871a26003";

    var contract = new web3.eth.Contract(abi, address);

    async function mintToken() {
        let account = await window.ethereum.request({method: 'eth_requestAccounts'});
        let supply = await contract.methods.totalSupply().call();
        let token = supply - 1;
        setToken(token);
        
    }



    return (
        <div className="page">
            <div className="page_navbar">
                <button className="navbar_button" onClick={() => navigate("/")}>Home</button>
                <button className="navbar_button" onClick={() => navigate("/chain-info")}>ChainInfo</button>
                <button className="navbar_button" onClick={() => navigate("/fakeBayc")}>FakeBayc</button>
                <button className="navbar_button" onClick={() => navigate("/fakeNefturians")}>FakeNefturians</button>
                <button className="navbar_button" onClick={() => navigate("/fakeMeebits")}>FakeMeebits</button>
            </div>
            <div className="page_header">
                <h1>Fake Meebits Page</h1>
            </div>
            <div className="page_body">
                <br/>
                <br/>
                <button className="page_button" onClick={mintToken}>Buy a token</button>
                <br />
                {isAccessible && (
                    <p>Token minted : {token}</p>
                )}
            </div>
            
        </div>
    );
}

export default FakeMeebits;