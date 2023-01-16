import { CSSProperties, DragEvent, useContext } from 'react'
import { useLocalStorage } from 'usehooks-ts';

import { TupleContext } from '..';
import { cleanupDraggable, setCustomDragImage } from '../../Draggable';
import { DRAGGING_ID } from '../state/browser-actions';
import { addTab, addNewView } from '../state/dispatchers';
import { DragSourceT, ID, TupleContextT } from '../TupleTypes';
import { PortsT } from '../Viewport/ViewportTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    pageId: ID,
    path: string[],
}


const Leaf = ({
    text,
    pageId,
    path,
}: Props) => {
    const {
        dispatch,
        state: {
            pages,
            viewport,
            classes,
            styles,
            template,
            events,
        }
    }: TupleContextT = useContext(TupleContext);

    const [_, setDragging] = useLocalStorage(DRAGGING_ID, false);

    const leafClassName = `
        ${_classes?.leaf || ''}
        ${template?.leaf || ''}
        ${classes?.leaf  || ''}`;

    const draggableClass = `
        ${template?.draggable || ''}
        ${classes?.draggable || ''}`;


    const getTopLeftPortIdHelper = (ports: PortsT, curPortId: ID): ID => {
        const currentPort = ports[curPortId];
        if (!currentPort)
            throw Error(`ID, ${curPortId}, missing from "ports"`);

        if (!ports[curPortId].isSplitView)
            return curPortId;

        return getTopLeftPortIdHelper(ports, currentPort.headId);
    }

    const getTopLeftPortId = (): ID => {
        const {root, ports} = viewport;
        return getTopLeftPortIdHelper(ports, root);
    }

    const dragStartHandler = (e: any) => {
        setCustomDragImage(e, text, draggableClass, styles.draggable);
        e.dataTransfer.setData('pageId', pageId);
        setDragging(true);
    };

    const dragEndHandler = () => {
        cleanupDraggable();
        setDragging(false);
    }

    const dragOverHandler = (e: DragEvent) => {
        if (events?.onTreeDrop)
            e.preventDefault();
    }

    const dropHandler = (e: DragEvent) => {
        if (events?.onTreeDrop) {
            const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
            const draggableName = pages[dragPageId].name;

            const portId = e.dataTransfer && e.dataTransfer.getData('portId');
            const source: DragSourceT = !!portId ? 'viewport' : 'tree';

            events.onTreeDrop(e, text, path, draggableName, source, 'leaf');
        }
    }

    const onClickHandler = () => {
        if (Object.keys(pages).length <= 0) {
            addNewView(dispatch, pageId)
        }

        const topLeftPortId = getTopLeftPortId();
        addTab(dispatch, topLeftPortId, '', pageId);
    }

    return (
        <div
            style={styles.leaf}
            className={leafClassName}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            onClick={onClickHandler}>
            { text }
        </div>
    );
};


export default Leaf;
