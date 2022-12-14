import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTContract from '../contractJson/fakeNefturians.json';

function FakeNefturiansTokenInfos() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [tab, setTab] = useState();
    const [isAccessible, setAccess] = useState(false);

    const { account } = useParams();

    useEffect(() => {
        setUser(account);
    })

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
    

    var contract = new web3.eth.Contract(abi, address);


    async function getTokenInfos() {
        let balance = await contract.methods.balanceOf(user).call();
        let list = [];

        for (let i = 0; i < balance; i++) {
            let tokenId = await contract.methods.tokenOfOwnerByIndex(user, i).call();
            let tokenURI = await contract.methods.tokenURI(tokenId).call();

            let tokenURIJSON = await fetch(tokenURI).then(res => res.json());

            list.push(tokenURIJSON);
        }

        const DisplayData = list.map(
            (token) => {
                return (
                    <tr>
                        <td>{token.name}</td>
                        <td>{token.description}</td>
                    </tr>
                )
            }
        )

        setTab(DisplayData);

        setAccess(true);
        
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
                <h1>Fake Nefturians Token Info</h1>
                <br/>
                <br/>
            </div>
            <div className="page_body">
                {!isAccessible && (
                    <button className="page_button" onClick={getTokenInfos}>Get Token's Infos</button>
                )}
            </div>
            {isAccessible && (
                <div className="page_body">
                    <br/>
                    <table className="table_token">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tab}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default FakeNefturiansTokenInfos;