import Navbar from "../Navbar";

function Error404() {
    return (
        <div className="page">
            <Navbar/>
            <div className="page_body">
                <h1>Problem... Problem... Problem...</h1>
                <p>Maybe check your Metamask network ;)</p>
            </div>
        </div>
    );
}

export default Error404;