import React, { forwardRef, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import basketImage from '../resources/basket.png';
import { Character } from '../stores/GameStore';

const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    will-change: transform;
    backface-visibility: hidden;
    z-index: 100;
`;

const HitRange = styled.div`
    position: absolute;
    top: -25px;
    left: 0;
    width: 100%;
    height: 1px;
`;

const CharacterImage = styled.img`
    width: 202px;
    bottom: -338px;
    left: -35px;

    position: absolute;
    will-change: transform;
    backface-visibility: hidden;
    display: block;
    z-index: 10;
`;

const BasketImage = styled.img`
    width: 131px;
    transform: translate3d(0, -35px, 0);
    position: relative;
`;

const moveFactor = 3;

const Basket = (props: any, ref: any) => {
    const currentCharacter = props.currentCharacter as Character;
    const [xPos, setPosition] = useState(0);
    const [moveDirection, setMoveDirection] = useState<'right' | 'left'>('right');
    const basketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const num = requestAnimationFrame(() => {
            if (!basketRef || !basketRef.current) return;
            if (xPos <= 0) {
                setMoveDirection('right');
            } else if (xPos >= window.innerWidth - basketRef.current.clientWidth) {
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

    const charImage = useMemo(() => currentCharacter ?
        require(`../resources/${currentCharacter.imagePrefix}-hold.png`) : '',
        [currentCharacter]);

    return (
        <div>
            <Container ref={basketRef} style={{
                transform: `translate3d(${xPos}px, 0, 0)`
            }}>
                <HitRange ref={ref} />
                <BasketImage src={basketImage} alt='' />
            </Container>
            <CharacterImage src={charImage} style={{
                transform: `translate3d(${xPos}px, 0, 0)`,
                ...currentCharacter.customHoldStyle
            }} />
        </div>
    )
}

export default forwardRef(Basket);