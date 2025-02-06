declare module 'GradientText' {
    import React from 'react';
  
    interface GradientTextProps {
        children: React.ReactNode;
        className?: string;
        // Add other props as needed
      }
  
    const GradientText: React.FC<GradientTextProps>;
    export default GradientText;
}