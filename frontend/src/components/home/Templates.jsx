import { useEffect, useMemo, useRef, useState } from "react";

export default function Template({ templateHTML }) {
  const iframeRef = useRef(null);
  const [scale, setScale] = useState(0.25); // default fallback

  const thumbW = 300; // container width
const thumbH = 400; // container height

const wrapperStyle = useMemo(
  () => ({
    width: thumbW + "px",
    height: thumbH + "px",
  }),
  []
);

useEffect(() => {
  const iframe = iframeRef.current;
  if (!iframe) return;

  const onLoad = () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;

      const body = doc.body;
      const html = doc.documentElement;

      const fullW = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      );
      const fullH = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      // Calculate scale so the whole thing fits inside the box
      const s = (thumbW, thumbH / fullH);
      setScale(s);

      // Set iframe’s internal size to the actual document size
      iframe.style.width = 500 + "px";
      iframe.style.height = fullH + "px";
    } catch (e) {
      // fail silently
    }
  };

  iframe.addEventListener("load", onLoad);
  return () => iframe.removeEventListener("load", onLoad);
}, [templateHTML]);





  return templateHTML ? (
  <div
    className="relative overflow-hidden rounded-2xl shadow-lg border bg-white"
    style={wrapperStyle}
  >
    <iframe
      ref={iframeRef}
      title="cv-preview"
      srcDoc={templateHTML}
      className="border-0 origin-top-left pointer-events-none"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    />
    <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-2xl" />
  </div>
) : (
  <div className="h-[85vh] grid place-items-center text-gray-500">
    Fill the form and click <b className="mx-1">Generate Preview</b> to see your CV template here.
  </div>
);
}
