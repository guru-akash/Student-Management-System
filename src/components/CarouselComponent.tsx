/**
 * CarouselComponent - A responsive image slider with auto-play functionality.
 * Features:
 * - Automatically rotates images every 3 seconds.
 * - Handles image loading errors by providing a placeholder.
 * - Responsive height for mobile, tablet, and desktop.
 */
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

/**
 * structure for each carousel item.
 */
interface CarouselItem {
  id: number;
  image: string;
  alt: string;
}

interface CarouselComponentProps {
  /** Array of items to be displayed in the carousel. */
  items: CarouselItem[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic: updates the index every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: (theme) => theme.shadows[4],
        height: { xs: 200, sm: 300, md: 400 }, // Responsive height configuration
      }}
    >
      <Box
        component="img"
        src={items[currentIndex].image}
        alt={items[currentIndex].alt}
        onError={(e) => {
          // Fallback mechanism if the specified image fails to load.
          console.error(`Image load failed for ${items[currentIndex].image}`);
          e.currentTarget.src = 'https://via.placeholder.com/1200x400';
          e.currentTarget.style.background = 'none';
        }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.5s',
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        }}
      />
    </Box>
  );
};

export default CarouselComponent;