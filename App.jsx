import Nav from "../src/components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "../src/components/SoundSection";
import DisplaySection from "../src/components/DisplaySection";
import WebgiViewer from "../src/components/WebgiViewer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Jumbotron />
      <SoundSection />
      <DisplaySection />
      <WebgiViewer />
    </div>
  );
}

export default App;
