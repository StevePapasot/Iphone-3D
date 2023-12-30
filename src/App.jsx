import Nav from "../src/components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "../src/components/SoundSection";
import DisplaySection from "../src/components/DisplaySection";
import WebgiViewer from "../src/components/WebgiViewer";
import { useRef } from "react";



function App() {

  const webgiViewerRef = useRef();
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  }


  return (
    <div className="App">
      <Nav />
      <Jumbotron />
      <SoundSection />
      <DisplaySection triggerPreview={handlePreview}/>
      <WebgiViewer ref={webgiViewerRef}/>
    </div>
  );
}

export default App;
