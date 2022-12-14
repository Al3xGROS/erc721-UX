import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { Link } from "react-router-dom";
import NFTContract from '../contractJson/fakeNefturians.json';
import Navbar from '../Navbar';

function FakeNefturians() {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [priceETH, setPriceETH] = useState();
    const [isAccessible, setAccess] = useState(false);
    const [account, setAccount] = useState("");

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";

    var contract = new web3.eth.Contract(abi, address);

    async function getInfo() {
        let name = await contract.methods.name().call();
        let price = await contract.methods.tokenPrice().call();
        setPrice(String(price * 1.00001));
        setPriceETH(web3.utils.fromWei(String(price * 1.00001)));
        setName(name);
    }

    async function buyToken() {
        const account = await window.ethereum.request({method: 'eth_requestAccounts'});
        let selectedAccount = account[0];
        setAccount(selectedAccount);
        await contract.methods.buyAToken().send({from: selectedAccount, value: price}).then(console.log && setAccess(true))
    }

    useEffect(() => {
        getInfo();
    })

    return (
        <div className="page">
            <Navbar/>
            <div className="page_header">
                <h1>Fake Nefturians Page</h1>
            </div>
            <div className="page_body">
                <p><b>Name:</b> {name}</p>
                <p><b>Price:</b> {priceETH} Sep</p>
            </div>
            <div className="page_body">
                <button className="page_button" onClick={buyToken}>Buy a token</button>
                <br />
                {isAccessible && (
                    <Link to={`/fakeNefturians/${account}`}>Get token infos</Link>
                )}
            </div>
        </div>
    );
}
export default FakeNefturians;