import React from 'react';
import { render } from 'react-dom';
import { ContainerLogic } from './components/sample_survey.jsx';

render(
    <ContainerLogic name='ml_mvp' />
	, document.getElementById('reactDiv')
)
