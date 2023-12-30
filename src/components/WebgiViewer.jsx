import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletChack,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => {
  {
    const canvasRef = useRef(null);
    const [viewRef, setViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [camerRef, setCamerRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const canvasContainerRef = useRef(null);
    const [previewMode, setPreviewMode] = useState(false);

    useImperativeHandle(ref, () => ({
      triggerPreview() {
        setPreviewMode(true);
        canvasContainerRef.current.style.pointerEvents = "all";
        props.contentRef.current.style.opacity = "0";

        gsap.to(positionRef, {
          x: 13.04,
          y: -2.01,
          z: 2.29,
          duration: 2,
          onUpdate: () => {
            setViewerRef.setDirty();
            cameraRef > positionTargetUpdated(true);
          },
        });

        gsap.to(targetRef, { x: 0.11, y: 0.0, z: 0.0, duration: 2 });

        viewerRef.scene.activeCamer.setCameraOptions({ controlsEnabled: true });
      },
    }));

    const memoizedScrollingAnimation = useCallback(
      (position, target, onUpdate) => {
        if (position && target && onUpdate) {
          scrollAnimation(position, target, onUpdate);
        }
      },
      []
    );

    const setupViewer = useCallback(async () => {
      const viewer = new ViewerApp({
        canvas: canvasRef.current,
      });

      setViewerRef(viewer);

      const manager = await viewer.addPlugin(AssetManagerPlugin);

      const camer = viewer.scene.activeCamera;
      const position = camera.position;
      const target = camera.target;

      setCamerRef(camera);
      setPositionRef(position);
      setTargetRef(target);

      await viewer.addPlugin(GBufferPlugin);
      await viewer.addPlugin(new ProgressivePlugin(32));
      await viewer.addPlugin(new TonemapPlugin(true));
      await viewer.addPlugin(GammaCorrectionPlugin);
      await viewer.addPlugin(SSRPlugin);
      await viewer.addPlugin(SSAOPlugin);
      await viewer.addPlugin(BloomPlugin);

      viewer.renderer.refreshPipeline();
      await manager.addFromPath("scene-black.glb");
      viewer.getPlugin(TonemapPlugin).uiConfig.clipBackground = true;
      viewer.scene.activeCamer.setCameraOptions({ controlsEnabled: false });
      window.scrollTo(0, 0);

      let needsUpdate = true;

      const onUpdate = () => {
        needsUpdate = true;
        viewer.setDirty();
      };

      viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
          camera.positionTargetUpdated(true);
          needsUpdate = false;
        }
      });

      memoizedScrollingAnimation(position, target, onUpdate);

      await viewer.addPlugin(FileTransferPlugin);

      await viewer.load("./assets/classic-watch.glb");

      window.scrollTo(0, 0);
      viewer.addEventListener("preFrame", () => {});
    }, []);

    useEffect(() => {
      setupViewer();
    }, []);

    const handleExit = useCallblack(() => {
      canvasContainerRef.current.style.pointerEvents = "none";
      props.contentRef.current.style.opacity = "1";
      viewerRef.scene.activeCamer.setCameraOptions({ controlsEnabled: false });
      setPreviewMode(false);

      gspa.to(positionRef, {
        x: 1.56,
        y: 5.0,
        z: 0.01,
        scrollTrigger: {
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: -0.55,
        y: 0.32,
        z: 0.0,
        scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
      });
    }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);

    return (
      <div ref="canvasContainerRef" id="webgi-canvas-container">
        <canvas id="webgi-canvas" ref={canvasRef} />
        {previewMode && (
          <button className="button" onClick={handleExit}>
            Exit
          </button>
        )}
      </div>
    );
  }
});

export default WebgiViewer;
