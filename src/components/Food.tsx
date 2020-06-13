import React, { FunctionComponent, useState, useEffect, RefObject, useRef, useMemo } from 'react';
import GameStore, { FoodDetails } from '../stores/GameStore';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

function isCollide(a: any, b: any) {
    const didCollide = !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );

    return didCollide;
}

function getRandomXPosition(element: any) {
    if (!element) return;
    var x = document.body.offsetWidth - element.clientWidth - 60;
    var randomX = Math.floor(Math.random() * x);
    return randomX;
}

type Props = {
    foodDetails: FoodDetails;
    basketRef: RefObject<HTMLDivElement>
}

const Container = styled.div`
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    backface-visibility: hidden;
    
    img {
        width: 100%;
    }
`;

const HitRange = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 10px;
`;

const yFactor = 4;
const Food: FunctionComponent<Props> = ({ basketRef, foodDetails: { imageUrl, allergy } }) => {
    const [yPos, setYPos] = useState(0);
    const [xPos, setXPos] = useState(0);
    const [vanish, setVanish] = useState(false);
    const [didStart, setDidStart] = useState(false);
    const foodRef = useRef<HTMLDivElement>(null);
    const hitRangeRef = useRef<HTMLDivElement>(null);

    const foodImage = useMemo(() => require(`../resources/${imageUrl}`), [imageUrl]);
    const {currentCharacter, takeHit} = GameStore;

    useEffect(() => {
        setXPos(getRandomXPosition(foodRef.current) || 0);
    }, []);
    useEffect(() => {
        if (!basketRef.current || !foodRef.current || !hitRangeRef.current) return;

        if (yPos > window.innerHeight) {
            setVanish(true);
            return;
        }

        if (isCollide(basketRef.current.getBoundingClientRect(), hitRangeRef.current.getBoundingClientRect())) {
            if(currentCharacter!.allergies.includes(allergy)) {
                takeHit();
            }
            setVanish(true);
            return;
        }

        const animationRef = requestAnimationFrame(() => {
            setYPos(yPos + yFactor);

            if (!didStart)
                setDidStart(true);
        })

        setDidStart(true);
        return () => cancelAnimationFrame(animationRef);
    }, [yPos, basketRef, didStart]);

    if (vanish) return null;

    return (
        <Container ref={foodRef} style={{
            transform: `translate3d(${xPos}px, ${yPos}px, 0)`,
            display: didStart ? 'block' : 'none'
        }}>
            <HitRange ref={hitRangeRef} />
            <img src={foodImage} alt='' />
        </Container>
    )
}

export default observer(Food);