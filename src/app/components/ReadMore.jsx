import { useState } from 'react';

export const ReadMore = ({ id, text, amountOfChars = 500 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if the text can overflow based on character length
  const itCanOverflow = text.length > amountOfChars;
  const beginText = itCanOverflow
    ? text.slice(0, amountOfChars) // Get the initial part up to the character limit
    : text;

  const endText = itCanOverflow ? text.slice(amountOfChars) : '';

  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <p id={id}>
      <span dangerouslySetInnerHTML={{ __html: beginText }} />
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className={`${!isExpanded && 'hidden'}`}
            aria-hidden={!isExpanded}
            dangerouslySetInnerHTML={{ __html: endText }}
          />
          <span
             className={`text-violet-400 ${isExpanded ? "ml-2" : "ml-2"} mt-2`}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'show less' : 'show more'}
          </span>
        </>
      )}
    </p>
  );
}
