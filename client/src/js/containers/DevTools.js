import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/**
 * Create the DevTools component and export it.
 */
export default createDevTools(
    <DockMonitor
        /**
         * Hide or show the dock with "ctrl-h".
         */
        toggleVisibilityKey="ctrl-h"
        /**
         * Change the position of the dock with "ctrl-q".
         */
        changePositionKey="ctrl-q"
        defaultIsVisible
        defaultPosition="bottom"
        defaultSize={0.15}
    >
        {/* <LogMonitor theme="tomorrow" /> */}
        <SliderMonitor />
    </DockMonitor>,
);
