import React, { useState } from 'react';
import Web3 from 'web3'
import NFTContract from "../contractJson/fakeMeebitsClaimer.json";
import sig from "../contractJson/signatures.json";
import Navbar from '../Navbar';

function FakeMeebits() {
    const [token, setToken] = useState();
    const [isAccessible, setAccess] = useState(false);

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55";

    var contract = new web3.eth.Contract(abi, address);

    async function claimToken() {
        let account = await window.ethereum.request({method: 'eth_requestAccounts'});
        
        if (await contract.methods.tokensThatWereClaimed(token).call() === true) {
            alert("Token already claimed idiot!");
            console.log("Token already claimed : ", token);
        }
        else {
            const signature = sig[token].signature;
            const result = await contract.methods.claimAToken(token, signature).send({from: account[0]});
            if (result) {
                setAccess(true);
            } 
            else {
                alert("ERROR PLEASE TRY AGAIN");
            }
        }
    }

    const change = (event) => {
        setToken(event.target.value);
    }

    return (
        <div className="page">
            <Navbar/>
            <div className="page_header">
                <h1>Fake Meebits Page</h1>
            </div>
            <div className="page_body">
                <br/>
                <br/>
                <label>Chose the token you want to claim</label>
                <br/>
                <br/>
                <input type="number" min="0" onChange={e => change(e)}></input>
                <br/>
                <br/>
                <button className="page_button" onClick={claimToken}>Claim token</button>
                <br />
                {isAccessible && (
                    <p>Token claimed : {token}</p>
                )}
            </div>
            
        </div>
    );
}

export default FakeMeebits;