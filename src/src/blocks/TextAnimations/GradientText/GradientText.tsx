import React from 'react';

interface GradientTextProps {
  text: string;
  style?: React.CSSProperties;
}

const GradientText: React.FC<GradientTextProps> = ({ text, style = {} }) => {
  return (
    <span style={{ ...style, backgroundImage: 'linear-gradient(to right, #4be2fe, #34c759)' }}>
      {text}
    </span>
  );
};

/**
 * GradientText component
 *
 * Displays text with a gradient background style.
 *
 * @param {string} text - The text to display.
 * @param {React.CSSProperties} [style] - Optional styles to apply to the text.
 */
export default GradientText;