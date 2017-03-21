import React from 'react'
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';

const historyApiFallback = require('connect-history-api-fallback');
const apiKey = '488227614eff4d30d16ad931527dc9a4';

export default class