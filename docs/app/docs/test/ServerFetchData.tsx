const ServerFetchData = () => {
    return (
        <>
            <h2>Server time:{new Date().toLocaleString()}</h2>
            {/* <FetchData /> */}
        </>
    );
};

const FetchData = async () => {
    const response = await fetch("https://api.natiq.net/mushafs/");
    const data = await response.json();

    return <h2>Data: {data[0].name}</h2>;
};

export default ServerFetchData;
