import Image from "next/image";

const StickyNote = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50">
      <Image
        src="/Sticky-Appear.gif"
        alt="Sticky Note"
        width={200}
        height={200}
        unoptimized
        style={{"imageRendering": "pixelated"}}
      />
    </div>
  );
};

export default StickyNote;
