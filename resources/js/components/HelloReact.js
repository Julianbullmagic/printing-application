import React from 'react';
import ReactDOM from 'react-dom';
import Designer from 'react-designer-component';
import Painter from './Painter'

if (document.getElementById('hello-react')) {
    ReactDOM.render(<Painter />, document.getElementById('hello-react'));
}
