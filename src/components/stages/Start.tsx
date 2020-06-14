import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import GameStore from '../../stores/GameStore';
import {observer} from 'mobx-react-lite';
import gameLogo from '../../resources/gamelogo.png';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const StartButton = styled.button`
    display:inline-block;
    border: 0;
    margin: 0 auto;
    padding: 15px 40px;

    background-color: rgb(173, 65, 65);
    cursor: pointer;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    border-radius: 18px;
    outline: none;
    margin-top: auto;
    margin-bottom: 60px;
    letter-spacing: 2px;
`;

const GameLogoContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 80px;
    text-align: center;
    justify-content: center;

    img {
        max-width: 330px;
    }
`;

const Start: FunctionComponent = () => {
    const handleClick = useCallback(() => {
        GameStore.setStage('character-selection');
    }, []);

    return (
        <Container>
            <GameLogoContainer>
                <img src={gameLogo} />
            </GameLogoContainer>
            <StartButton onClick={handleClick}>Start</StartButton>
        </Container>
    )
}

export default observer(Start);