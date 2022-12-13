import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';



function ChainInfo() {
    const navigate = useNavigate();

    const [isConnected, setIsConnected] = useState(false);
    const [chainId, setChainId] = useState("");
    const [lastBlockNumber, setBlockNumber] = useState("");
    const [address, setAddress] = useState("");


    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3;
        } else {
            console.log("Install Metamask extension you idiot.");
        }
        return provider;
    }

    const onConnect = async() => {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({method: 'eth_requestAccounts'})
                const web3 = new Web3(currentProvider);
                let chainId = await web3.eth.getChainId();
                if (chainId !== 11155111) {
                    window.open("/error404", "_self");
                }
                let lastBlockNumber = await web3.eth.getBlockNumber();
                let address = await web3.eth.getAccounts();
                setIsConnected(true);
                setChainId(chainId);
                setBlockNumber(lastBlockNumber);
                setAddress(address);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const onDisconnected = () => {
        setIsConnected(false);
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
                <h1>Chain Info Page</h1>
            </div>
            <div className="page_body">
                <p>Click here to connect to your metamask</p>
                {!isConnected && (
                    <button className="page_button" onClick={onConnect}>Connect</button>
                )}
            </div>
            {isConnected && (
                <div className="page_body">
                    <p>Here are the Infos :</p>
                    <br/>
                    <span>Chain Id : </span> {chainId}
                    <br/>
                    <span>Last Block Number : </span> {lastBlockNumber}
                    <br/>
                    <span>Address : </span> {address}
                    <br/>
                    <button className="page_button" onClick={onDisconnected}>Disconnect</button>
                </div>
            )}
            
        </div>
    );
}

export default ChainInfo;