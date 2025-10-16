import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Flexible typewriter:
 *
 * Single text (type once):
 *   <TypewriterCycle>Next steps:</TypewriterCycle>
 *   or <TypewriterCycle text="Next steps:" />
 *
 * List of phrases (type, hold, erase, next):
 *   <TypewriterCycle phrases={["One", "Two", "Three"]} cycle />
 *
 * Props:
 * - text?: string                // optional single string (alternative to children)
 * - phrases?: string[]           // optional list of phrases (takes precedence over text/children)
 * - cycle?: boolean              // loop phrases forever (default: false)
 * - eraseLast?: boolean          // when NOT cycling, erase the last phrase too (default: false)
 * - speed?: number               // ms per typed character (default: 45)
 * - eraseSpeed?: number          // ms per erased character (default: 30)
 * - startDelay?: number          // ms before first typing begins (default: 0)
 * - holdFor?: number             // ms to hold fully-typed phrase before erasing (default: 900)
 * - betweenPhrases?: number      // ms pause AFTER erase BEFORE next typing (default: 250)
 * - cursor?: boolean             // show blinking cursor during typing/erasing (default: true)
 * - cursorChar?: string          // cursor glyph (default: "│")
 * - onDone?: () => void          // called when the whole sequence completes (non-cycling)
 * - className?: string
 *
 * Children fallback:
 * - If no `phrases` prop is provided, component will extract text from children or `text`.
 */
export default function TypewriterCycle({
  children,
  text,
  phrases,
  cycle = false,
  eraseLast = false,
  speed = 45,
  eraseSpeed = 30,
  startDelay = 0,
  holdFor = 900,
  betweenPhrases = 250,
  cursor = true,
  cursorChar = "",
  onDone,
  className,
  // alias for common typo :)
  cyucle,
}) {
  // accept 'cyucle' as alias for 'cycle'
  const loop = typeof cyucle === "boolean" ? cyucle : cycle;

  // Extract plain text from children if needed
  const childrenToText = useMemo(() => {
    const parts = [];
    const walk = (node) => {
      if (node == null || node === false) return;
      if (typeof node === "string" || typeof node === "number") {
        parts.push(String(node));
      } else if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (typeof node === "object" && "props" in node) {
        walk(node.props?.children);
      }
    };
    walk(children);
    return parts.join("");
  }, [children]);

  // Determine mode: single vs list
  const phraseList = useMemo(
    () => (Array.isArray(phrases) && phrases.length > 0 ? phrases : null),
    [phrases]
  );
  const singleText = useMemo(
    () => (phraseList ? "" : (text ?? childrenToText ?? "")),
    [phraseList, text, childrenToText]
  );

  const isListMode = Boolean(phraseList);
  const [charIndex, setCharIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // waiting | typing | holding | erasing | done
  const [phase, setPhase] = useState(startDelay > 0 ? "waiting" : "typing");
  const timers = useRef([]);

  const currentPhrase = isListMode
    ? phraseList[phraseIndex] ?? ""
    : singleText ?? "";

  // Cleanup timers
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // Reset when inputs change
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhraseIndex(0);
    setCharIndex(0);
    setPhase(startDelay > 0 ? "waiting" : "typing");
  }, [isListMode, singleText, phraseList, startDelay]);

  useEffect(() => {
    const later = (fn, ms) => {
      const t = setTimeout(fn, ms);
      timers.current.push(t);
    };

    if (phase === "waiting") {
      later(() => setPhase("typing"), startDelay);
      return;
    }

    if (phase === "typing") {
      if (charIndex < currentPhrase.length) {
        later(() => setCharIndex((i) => i + 1), speed);
      } else {
        // fully typed
        if (!isListMode) {
          setPhase("done");
          onDone && onDone();
          return;
        }
        // list mode
        const isLast = phraseIndex === (phraseList?.length ?? 1) - 1;
        if (!loop && isLast && !eraseLast) {
          // stop on last phrase shown
          setPhase("done");
          onDone && onDone();
        } else {
          setPhase("holding");
          later(() => setPhase("erasing"), holdFor);
        }
      }
      return;
    }

    if (phase === "erasing") {
      if (charIndex > 0) {
        later(() => setCharIndex((i) => i - 1), Math.max(10, eraseSpeed));
      } else {
        // move to next phrase (if any)
        const lastIdx = (phraseList?.length ?? 1) - 1;
        const isLast = phraseIndex === lastIdx;

        if (isLast) {
          if (loop) {
            later(() => {
              setPhraseIndex(0);
              setPhase("typing");
            }, betweenPhrases);
          } else {
            // finished erasing the last one (only happens if eraseLast=true)
            setPhase("done");
            onDone && onDone();
          }
        } else {
          later(() => {
            setPhraseIndex((p) => p + 1);
            setPhase("typing");
          }, betweenPhrases);
        }
      }
      return;
    }

    // holding handled above via timer -> erasing
    // done: nothing
  }, [
    phase,
    charIndex,
    currentPhrase.length,
    isListMode,
    phraseIndex,
    phraseList,
    loop,
    eraseLast,
    speed,
    eraseSpeed,
    holdFor,
    betweenPhrases,
    startDelay,
    onDone,
  ]);

  const showCursor =
    cursor && (phase === "typing" || phase === "erasing" || (loop && phase !== "done"));

  return (
    <span className={className}>
      {currentPhrase.slice(0, charIndex)}
      {showCursor ? <span className="tw-cursor">{cursorChar}</span> : null}
    </span>
  );
}
