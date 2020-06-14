import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameStore from '../../stores/GameStore';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#000;
`;

const CountContainer = styled.div`
    text-align: center;
`;

const Description = styled.div`
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Count = styled.div`
    font-size: 28px;
    color: red;
`;

const Countdown = () => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        if(count === 0) {
            GameStore.setStage('in-game');
            return;
        }
        const tm = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearTimeout(tm);
        }
    }, [count]);
    return (
        <Container>
            <CountContainer>
                <Description>
                    TAP THE SCREEN TO MOVE THE BASKET
                </Description>
                <Count>{count}</Count>
            </CountContainer>
        </Container>
    )
}

export default Countdown;