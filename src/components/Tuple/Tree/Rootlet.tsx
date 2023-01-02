import { CSSProperties, ReactNode, useContext } from 'react'

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { open_new_viewport_window } from '../state/browser-actions';
import { ID, TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    treeId: ID,
    open: boolean,
    openSymbol?: string | ReactNode, //TODO: Maybe a part of context?
    closeSymbol?: string | ReactNode,
    style?: CSSProperties,
}


const Rootlet = ({
    text,
    treeId,
    open,
    openSymbol='O',
    closeSymbol='C',
}: Props) => {
    const { state: {
        classes,
        styles,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const rootletClassName = `
        ${_classes?.rootlet || ''}
        ${template?.rootlet || ''}
        ${classes?.rootlet  || ''}`;

    const symbolContainerClassName = `
        ${_classes?.symbolContainer}
        `

    const draggableClass = `
        ${template?.draggable || ''}
        ${classes?.draggable || ''}`;


    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
    };

    const onClickHandler = (e: any) => {
        //TODO: Also need to implement this for Leaf... Should be trivial getting topLeft leaf. Just keep traversing the heads of each Port until you get it...
    }

    const dragEndHandler = (e: any) => {
        cleanupDraggable();
        open_new_viewport_window(text);
    }

    

    return (
        <div
            style={styles.rootlet}
            className={rootletClassName}
            draggable
            onClick={onClickHandler}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}>
            <>  {/* TODO: Why do I need this? */}
                <div className={symbolContainerClassName}>
                    { open ? openSymbol : closeSymbol }
                </div>

                <input type="text"
                    id={text}
                    name={text}
                    value={text}
                />
            </>
        </div>
    );
};


export default Rootlet;