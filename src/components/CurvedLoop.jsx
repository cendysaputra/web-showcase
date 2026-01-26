import { useRef, useEffect, useState, useMemo, useId } from 'react';
import flowerIcon from '../assets/images/flower.svg';

const CurvedLoop = ({
  marqueeText = '',
  speed = 1,
  className = '',
  curveAmount = 200,
  direction = 'left',
  interactive = true,
  textColor = '#f5f5f5'
}) => {
  // Split text by the bullet point to insert flower icons
  const textParts = useMemo(() => {
    const cleanText = marqueeText.replace(/\s+$/, '');
    return cleanText.split('•');
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const startY = 100;
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const patternId = `flower-pattern-${uid}`;
  const pathD = `M-500,${startY} Q720,${startY + curveAmount} 1940,${startY}`; 

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  // We need to render the content structure once to measure it, then repeat it
  // The structure is: Part + Space + Flower(as block char) + Space ...
  const ContentUnit = () => (
    <>
      {textParts.map((part, index) => (
        <tspan key={index}>
          {part}
          {index < textParts.length - 1 && (
            <>
              <tspan dx="15"> </tspan>
              <tspan 
                fill={`url(#${patternId})`} 
                fontWeight="normal" 
                dy="20"
                style={{ fontSize: '0.8em', fontFamily: 'Arial, sans-serif' }}
              >
                ●
              </tspan>
              <tspan dy="-20" dx="15"> </tspan>
            </>
          )}
           {/* Add separator at the end if it's the loop connector, BUT we usually want a seamless loop.
               The hasTrailing logic in original code added a non-breaking space.
               Here we probably want a flower between the last item and the first item of next loop?
               The original 'text' had a trailing space/char.
            */}
        </tspan>
      ))}
      <tspan dx="15"> </tspan>
      <tspan 
        fill={`url(#${patternId})`} 
        fontWeight="normal" 
        dy="20"
        style={{ fontSize: '0.8em', fontFamily: 'Arial, sans-serif' }}
      >
        ●
      </tspan>
      <tspan dy="-20" dx="15"> </tspan>
    </>
  );

  useEffect(() => {
    if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [textParts, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';
  
  // Calculate how many times to repeat based on spacing
  const repeatCount = spacing ? Math.ceil(5000 / spacing) + 2 : 1;
  const loopArray = Array.from({ length: repeatCount });

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
          <pattern id={patternId} width="1" height="1" viewBox="0 0 100 100" patternUnits="objectBoundingBox">
             <image href={flowerIcon} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
          </pattern>
        </defs>

        {/* Hidden text to measure width */}
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
          <ContentUnit />
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
              {loopArray.map((_, i) => (
                 <ContentUnit key={i} />
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
