import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

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
                <h1>Home Page</h1>
            </div>
            <div className="page_body">
                <p>This is the link to the Github of the <a href="https://github.com/Al3xGROS/erc721-UX">Project</a></p>
            </div>
        </div>
    );
}

export default Home;