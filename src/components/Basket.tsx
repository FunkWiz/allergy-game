import React, { forwardRef, useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import basketImage from '../resources/basket.png';

const Container = styled.div`
    position: absolute;
    bottom: 100px;
    left: 0;
    will-change: transform;
    backface-visibility: hidden;
    img {
        width: 131px;
        transform: translate3d(0, -35px, 0);
    }
`;

const HitRange = styled.div`
    position: absolute;
    top: -25px;
    left: 0;
    width: 100%;
    height: 1px;
`;

const moveFactor = 3;

const Basket = (_: any, ref: any) => {
    const [xPos, setPosition] = useState(0);
    const [moveDirection, setMoveDirection] = useState<'right' | 'left'>('right');
    const basketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const num = requestAnimationFrame(() => {
            if(!basketRef || !basketRef.current) return;
            if(xPos <= 0) {
                setMoveDirection('right');
            } else if(xPos >= window.innerWidth - basketRef.current.clientWidth) {
                setMoveDirection('left');
            }

            setPosition(moveDirection === 'right' ? xPos + moveFactor : xPos - moveFactor);
        })

        return () => {
            cancelAnimationFrame(num);
        }
    }, [moveDirection, xPos])

    const toggleDirection = useCallback(() => {
        setMoveDirection(moveDirection === 'right' ? 'left' : 'right');
    }, [moveDirection]);

    useEffect(() => {
        window.addEventListener('click', toggleDirection);

        return () => {
            window.removeEventListener('click', toggleDirection);
        }
    }, [toggleDirection])
    return (
        <Container ref={basketRef} style={{
            transform: `translate3d(${xPos}px, 0, 0)`
        }}>
            <HitRange ref={ref} />
            <img src={basketImage} alt='' />
        </Container>
    )
}

export default forwardRef(Basket);