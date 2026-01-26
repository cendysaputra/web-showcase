import { useRef, useEffect, useState, useMemo, useId } from 'react';

const CurvedLoop = ({
  marqueeText = '',
  speed = 1,
  className = '',
  curveAmount = 200,
  direction = 'left',
  interactive = true,
  textColor = '#f5f5f5'
}) => {
  const text = useMemo(() => {
    // Basic text cleaning, ensure single space at end for spacing if needed
    // We are now just using straight text without complex splitting since we are reverting separator
    const cleanText = marqueeText.replace(/\s+$/, '');
    return cleanText + ' • '; // Add bullet separator at the end of each block
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const startY = 100;
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-500,${startY} Q720,${startY + curveAmount} 1940,${startY}`; 

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  // Using pure velocity/offset state to manage movement for smoothness
  // Instead of requestAnimationFrame logic sometimes lagging, we simplify.
  
  // To handle smooth loop, we need a LONG string of repeated text.
  
  // Calculate repetitions needed to fill a very long path
  // If path width is ~2440 (from -500 to 1940), and we want buffer.
  // We need enough text to cover e.g. 5000px.
  
  const widthToCover = 5000;

  useEffect(() => {
    if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  // Construct the long repeated text string
  const totalText = useMemo(() => {
    if (!spacing) return text;
    const count = Math.ceil(widthToCover / spacing) + 2;
    return new Array(count).fill(text).join('');
  }, [text, spacing]);

  useEffect(() => {
    if (!spacing) return;
    // Set initial offset to hide the startup jump if possible, or just start at 0
    // Actually, starting at -spacing helps smoothness if we append text
    if (textPathRef.current) {
      setOffset(-spacing); 
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing) return;
    
    let animationFrameId;
    let lastTime = performance.now();
    
    const animate = (time) => {
      // Calculate delta time for smoother speed regardless of frame rate drops
      // But for simple marquee, fixed step is often smoother visually than delta-time if frame rate jitters slightly.
      // However, if "sometimes fast sometimes slow" -> browser throttling or variable FPS.
      // We will stick to simple increment per frame for consistency, or use delta if major lags.
      // Since user complaining about jitter, "uneven speed", let's try fixed increment first but ensure no heavy processing.
      
      // Check drag
      if (!dragRef.current && textPathRef.current) {
         // Simply update the offset ref value (using closure variable or ref)
         // We use setOffset state less frequently? No, we manipulate DOM directly for performance, 
         // and only sync state if needed (or not at all).
         
         const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
         const delta = dirRef.current === 'right' ? speed : -speed;
         
         let newOffset = currentOffset + delta;
         
         // Loop logic
         // If we moved left (-spacing), we reset to 0? 
         // Text moves left (negative offset).
         // When offset reaches -spacing (one full text block moved out), we shift it back by +spacing to loop.
         // Wait. Initial offset is -spacing. Speed is positive? No, default direction 'left'.
         // If direction left, delta should be negative.
         // If offset becomes < -2 * spacing, we add spacing?
         
         // Let's visualize: 
         // [Text1][Text2][Text3]...
         // Viewport sees part of it.
         // Move left -> offset decreases.
         // When [Text1] is fully gone (offset decreased by 'spacing'), [Text2] is where [Text1] was.
         // So we can jump 'offset += spacing' without visual change.
         
         const wrapThreshold = -spacing * 2; // threshold to reset
         
         // Ensure logic handles wrap seamlessly
         if (delta < 0) { // Moving Left
             if (newOffset <= wrapThreshold) {
                 newOffset += spacing;
             }
         } else { // Moving Right
             if (newOffset >= 0) {
                 newOffset -= spacing;
             }
         }

         textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [spacing, speed]); // Removed 'ready' dependency to avoid restarts

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    // Determine direction based on drag? Or keep original?
    // User didn't ask for physics. Keep simple.
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'default';

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ visibility: spacing > 0 ? 'visible' : 'hidden', cursor: cursorStyle, height: '500px', overflow: 'hidden' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className={`select-none w-full overflow-visible block leading-none ${className}`}
        viewBox="0 0 1440 500"
        style={{ height: '100%', width: '100%' }}
      >
        <defs>
            <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {/* Hidden text to measure single block width */}
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          style={{ 
            visibility: 'hidden', 
            opacity: 0, 
            pointerEvents: 'none',
            fontSize: '120px', 
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontWeight: 600
          }}
        >
          {text} 
        </text>
        
        {spacing > 0 && (
          <text 
            xmlSpace="preserve" 
            className="fill-current" 
            style={{ 
              fontSize: '120px',
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontWeight: 600,
              fill: textColor
            }}
          >
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
