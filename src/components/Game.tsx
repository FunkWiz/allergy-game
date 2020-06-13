import React, { FunctionComponent } from 'react';
import GameStore, { Stage } from '../stores/GameStore';
import Start from './stages/Start';
import InGame from './stages/InGame';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import CharacterSelection from './stages/CharacterSelection';

const Container = styled.div`
    max-width: 480px;
    height: 100vh;
    overflow: hidden;
    font-family: monospace, Arial, sans-serif;
`;

const stageToComponent: { [key in Stage]: FunctionComponent } = {
    'start': Start,
    'character-selection': CharacterSelection,
    'in-game': InGame
}

const Game: FunctionComponent = () => {
    const { currentStage } = GameStore;

    const StageComponent = stageToComponent[currentStage];

    return (
        <Container>
            <StageComponent />
        </Container>
    )
}

export default observer(Game);