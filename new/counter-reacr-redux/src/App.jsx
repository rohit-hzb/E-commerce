import { useSelector } from "react-redux";
import "./App.css";
import Conatiner from "./Components/Container";
import Controls from "./Components/Controls";
import DisplayCounter from "./Components/DisplayCounter";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivacyMessage from "./Components/PrivacyMessage";

function App() {

  const Privacy =useSelector(store=>store.privacy)
  return (
    <>
      <center className="px-4 py-5 my-5 text-center">
        <Conatiner>
          <Header />
          <div className="col-lg-6 mx-auto __web-inspector-hide-shortcut__">
            {Privacy ? <PrivacyMessage/>:<DisplayCounter />}
            <Controls />
          </div>
        </Conatiner>
      </center>
    </>
  );
}

export default App;
