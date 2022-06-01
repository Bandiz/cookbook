import { useEffect, useState } from 'react';
import { useRecipes } from '../../../contexts/RecipesContext';
import CarouselSlide from './CarouselSlide';
import { Arrow } from './Arrow';
import { Slide } from '@mui/material';

export default function Carousel() {
    const [index, setIndex] = useState(0);
    const { recipes } = useRecipes();

    const content = recipes[index];
    const numSlides = recipes.length;

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');

    const onArrowClick = (direction: any) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;
        setIndex(newIndex);

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    if (!recipes || recipes.length === 0) {
        return null;
    }

    return (
        <div className="carousel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Arrow direction="left" clickFunction={() => onArrowClick('left')} />
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <CarouselSlide content={content} />
                </div>
            </Slide>
            <Arrow direction="right" clickFunction={() => onArrowClick('right')} />
        </div>
    );
}
