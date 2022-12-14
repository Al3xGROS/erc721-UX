import Navbar from "../Navbar";

function Home() {
    return (
        <div className="page">
            <Navbar/>
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