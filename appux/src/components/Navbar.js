import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="page_navbar">
            <button className="navbar_button" onClick={() => navigate("/")}>Home</button>
            <button className="navbar_button" onClick={() => navigate("/chain-info")}>ChainInfo</button>
            <button className="navbar_button" onClick={() => navigate("/fakeBayc")}>FakeBayc</button>
            <button className="navbar_button" onClick={() => navigate("/fakeNefturians")}>FakeNefturians</button>
            <button className="navbar_button" onClick={() => navigate("/fakeMeebits")}>FakeMeebits</button>
        </div>
    );
}

export default Navbar;