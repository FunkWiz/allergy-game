import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameStore from '../../stores/GameStore';

const Container = styled.div`
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    color:#000;
    padding: 10px;
    > div {
      font-size: 22px;
      color: #000;
      direction: rtl;
      font-weight: 700;
    }
`;

const Final = () => {
    useEffect(() => {
        setTimeout(() => {
            GameStore.setStage('start');
        }, 10000)
    }, []);
    return (
        <Container>
            <div>
                מאכלים קטנים יכולים להרוג אנשים גדולים <br /><br />
                1 מתוך 30 ישראלים אלרגי למזון <br /><br />
                הם נמצאים בסכנת מוות בכל פעם שהם יוצאים מהבית <br /><br />
                התקווה היחידה היא תרופה.
            </div>
        </Container>
    )
}

export default Final;