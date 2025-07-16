import React from "react";

// AI Writtin. I have no clue about fragments, I'll figure it out later.

function HighlightText({ text, searchTerms }) {
  if (!text || !searchTerms || searchTerms.length === 0) {
    return <span>{text}</span>; // Return original text if no search terms or text
  }

  // Ensure search terms are unique and sorted by length (descending)
  // This helps avoid issues where "cat" is matched before "catsup" and then "sup" isn't matched correctly.
  // Also, make them case-insensitive for better matching.
  const uniqueSearchTerms = Array.from(new Set(searchTerms.map(term => term.toLowerCase())))
                               .sort((a, b) => b.length - a.length);

  // We'll build up an array of React nodes (strings and <strong> elements)
  let processedContent = [text]; // Start with the full text as the first "piece"

  uniqueSearchTerms.forEach(term => {
    // We need to escape special characters in the search term if it's used in a regex
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi'); // 'g' for global, 'i' for case-insensitive

    let newContent = [];
    processedContent.forEach(item => {
      // If the item is already a React element (e.g., a <strong> tag from a previous iteration),
      // we don't want to process its children, just add it directly.
      if (typeof item !== 'string') {
        newContent.push(item);
        return;
      }

      // Split the string by the current search term
      const parts = item.split(regex);

      // Now iterate through the parts and decide if it's a match or not
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.toLowerCase() === term) {
          // This part is a match, wrap it in <strong>
          newContent.push(<strong key={`${term}-${i}`}>{part}</strong>);
        } else if (part) {
          // This part is non-matching text, push it as a string
          newContent.push(part);
        }
      }
    });
    processedContent = newContent; // Update the content for the next iteration
  });

  return (
    <span>
      {processedContent.map((item, index) => (
        // Use index as a key if the order of items is stable and items don't change identity.
        // For more complex scenarios, you might need more robust keys.
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </span>
  );
}

export default HighlightText;
