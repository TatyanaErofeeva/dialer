import { Circles } from 'react-loader-spinner';

function Spinner () {
  return (
    <div style={{position:"absolute", top: "200px", right: "700px", color: "green", fontWeight: 'bold'}} >
        LOADING

    <Circles
      height="80"
      width="80"
      color="green"
      ariaLabel="loading"
    />
    </div>
  );
}

export {Spinner};