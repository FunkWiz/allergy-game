import React, { FunctionComponent, useEffect } from 'react';
import GameStore, { Stage } from '../stores/GameStore';
import Start from './stages/Start';
import InGame from './stages/InGame';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import CharacterSelection from './stages/CharacterSelection';
import Countdown from './stages/Countdown';
import Final from './stages/Final';

const Container = styled.div`
    max-width: 480px;
    height: 100vh;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
`;

const stageToComponent: { [key in Stage]: FunctionComponent } = {
    'start': Start,
    'character-selection': CharacterSelection,
    'in-game': InGame,
    'countdown': Countdown,
    'final': Final
}

const Game: FunctionComponent = () => {
    const { currentStage, shouldEndGame, setStage, reset } = GameStore;
    const StageComponent = stageToComponent[currentStage];

    useEffect(() => {
        if(!shouldEndGame) return;
        setStage('final');
        reset();
    }, [shouldEndGame]);

    return (
        <Container>
            <StageComponent />
        </Container>
    )
}

export default observer(Game);