// A custom utility to split text into characters and words
// This replaces the need for GSAP's commercial SplitText plugin

interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
}

export function splitText(element: HTMLElement): SplitTextResult {
  const text = element.textContent || "";
  const words = text.split(/\s+/);
  
  // Clear the element
  element.innerHTML = "";
  
  const chars: HTMLElement[] = [];
  const wordElements: HTMLElement[] = [];
  const lineElements: HTMLElement[] = [];
  
  // Current line tracking
  let currentLine: HTMLElement | null = null;
  let currentLineY = 0;
  
  words.forEach((word, i) => {
    // Create word span
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-text-word";
    wordSpan.style.display = "inline-block";
    wordSpan.style.position = "relative";
    
    // Add word to DOM
    wordElements.push(wordSpan);
    
    // Process each character in the word
    Array.from(word).forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.className = "split-text-char";
      charSpan.textContent = char;
      charSpan.style.display = "inline-block";
      charSpan.style.position = "relative";
      
      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    });
    
    // Add the word to the element
    element.appendChild(wordSpan);
    
    // Add space after word (except last word)
    if (i < words.length - 1) {
      const space = document.createElement("span");
      space.textContent = " ";
      space.style.display = "inline-block";
      element.appendChild(space);
    }
    
    // Check if this creates a new line (simplistic approach)
    // For more accuracy, would need to use getBoundingClientRect() after reflow
    if (!currentLine || wordSpan.offsetTop !== currentLineY) {
      currentLineY = wordSpan.offsetTop;
      currentLine = document.createElement("span");
      currentLine.className = "split-text-line";
      currentLine.style.display = "block";
      lineElements.push(currentLine);
    }
  });
  
  return {
    chars,
    words: wordElements,
    lines: lineElements
  };
}