import { CSSProperties, DragEvent } from 'react';

import _classes from './draggable.module.css';


const DRAG_ID = 'DRAG_QUEEN_STORY_HOUR_LMAOOOOO';


// Returns id of element, so calling component can remove it later
export const setCustomDragImage = (
    e: DragEvent<Element>,
    text: string = 'Dragging',
    className: string = '',
    style: CSSProperties | null = null,
) => {
    const elem = document.createElement("div");
    
    elem.id = DRAG_ID;
    elem.innerText = text;
    elem.className = `${_classes.draggable} ${className}`;

    if (style) {  // hacky
        for (const prop in style) {
            elem.style[prop as any] = (style as any)[prop];
        }
    }
    
    document.body.appendChild(elem);
    e.dataTransfer.setDragImage(elem, 40, 12);
}


export const cleanupDraggable = () => {
    const draggable = document.getElementById(DRAG_ID);
    if (draggable?.parentNode)
        draggable.parentNode.removeChild(draggable);
}


export const validateDraggable = (e: DragEvent<Element>): boolean => {
    const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
    return !!dragPageId;
}

//---------------------------------------------------------------------------------------------------------------------
// Checks if coordinates are outside window. Use e.clientX and e.clientY for pointer events
export const outsideWindow = (x: number, y: number) => x < 0 || x > window.outerWidth || y < 0 || y > window.outerHeight;
