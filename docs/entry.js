
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/lib/component/calendar/index.jsx';
reactComponents['Calendar'] = Component0;

import Component1 from '../src/lib/component/calendar/CalendarSelect.jsx';
reactComponents['CalendarSelect'] = Component1;

import Component2 from '../src/lib/component/datePicker/index.jsx';
reactComponents['DatePicker'] = Component2;

import Component3 from '../src/lib/component/dialog/index.jsx';
reactComponents['Dialog'] = Component3;

import Component4 from '../src/lib/component/error/index.jsx';
reactComponents['Error'] = Component4;

import Component5 from '../src/lib/component/calendar/TimeSelect.jsx';
reactComponents['TimeSelect'] = Component5;