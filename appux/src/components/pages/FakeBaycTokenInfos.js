import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import NFTContract from '../contractJson/fakeBayc.json';
import { IpfsImage } from 'react-ipfs-image';


function FakeBaycTokenInfos() {
    const navigate = useNavigate();

    const [tokenId, setTokenId] = useState();
    const [attributes, setAttributes] = useState();
    const [image, setImage] = useState();
    const [isAccessible, setAccess] = useState(false);
    const { id } = useParams();

    useEffect ( () => {
        setTokenId(id);
    })

    const web3 = new Web3(window.ethereum);
    const abi = NFTContract.abi;
    const address = "0x1dA89342716B14602664626CD3482b47D5C2005E";

    var contract = new web3.eth.Contract(abi, address);

    async function getTokenInfos() {
        if (tokenId >= await contract.methods.tokenCounter().call()) {
            alert("Token does not exist idiot!");
            console.log("Token out of bounds");
        } else {
            let infos = await contract.methods.tokenURI(tokenId).call();
            const infosJson = await fetch(infos).then(res => res.json());
            let att = infosJson.attributes;
            const DisplayData = att.map(
                (att) => {
                    return (
                        <tr>
                            <td>{att.trait_type}</td>
                            <td>{att.value}</td>
                        </tr>
                    )
                }
            )
            setAttributes(DisplayData);
            setImage(infosJson.image);
            setAccess(true);
        }
        
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
                <h1>Fake Bayc Token Info</h1>
            </div>
            <div className="page_body">
                {!isAccessible && (
                    <button className="page_button" onClick={getTokenInfos}>Get Token's Infos</button>
                )}
            </div>
                {isAccessible && (
                    <div className="page_body">
                        <table className="attributes_table">
                            <thead>
                                <tr>
                                    <th>Trait</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attributes}
                            </tbody>
                        </table>
                        <br/> 
                        <>
                            <IpfsImage hash={image} className="image_nft"/>
                        </>
                    </div>
                )}
        </div>
    );
}

export default FakeBaycTokenInfos;