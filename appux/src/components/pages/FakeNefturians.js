import React, {useEffect, useState} from 'react';
import Web3 from 'web3'
import {Link, useNavigate} from "react-router-dom";
import NFTContract from '../contractJson/fakeNefturians.json';

function FakeNefturians() {
    const navigate = useNavigate();

    const [infos, setInfos] = useState ({
        Name: "",
        Price: 0,
    });
    const [isAccessible, setAccess] = useState(false);
    const [account, setAccount] = useState("");

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";

    var contract = new web3.eth.Contract(abi, address);

    async function getInfo() {
        let name = await contract.methods.name().call();
        let price = await contract.methods.tokenPrice().call();
        setInfos ({
            Name: name,
            Price: String(price*1.00001),
        })
    }

    async function buyToken() {
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        let selectedAccount = account[0];
        setAccount(selectedAccount);
        await contract.methods.buyAToken().send({from: selectedAccount, value: infos.Price}).then(console.log && setAccess(true))
    }

    useEffect(() => {
        getInfo();
    })

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
            <h1>Fake Nefturians Page</h1>
        </div>
        <div className="page_body">
            <p><b>Name:</b> {infos.Name}</p>
            <p><b>Price:</b> {infos.Price}</p>
        </div>
        <div className="page_body">
            <button className="page_button" onClick={buyToken}>Buy a token</button>
            <br />
            {isAccessible && (
                <Link to={`/fakeNefturians/${account}`}>Get token infos</Link>
            )}
        </div>
    </div>
    )}
export default FakeNefturians;