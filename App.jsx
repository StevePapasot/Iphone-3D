import Nav from "../src/components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from '../src/components/SoundSection';
import DisplaySection from "../src/components/DisplaySection";


function App() {

  return (
    <div className="App">
        <Nav />
        <Jumbotron />
        <SoundSection />
        <DisplaySection />
    </div>
  );
}

export default App;
