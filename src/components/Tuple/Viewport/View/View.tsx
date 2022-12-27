import { useContext, useRef, MutableRefObject, DragEvent } from 'react';

import TabBar from './TabBar/TabBar';
import { TupleContext } from '../..';
import { ID, PageT, TupleContextT } from '../../TupleTypes';

import DropZoneSides from '../../../Dropzone/DropZoneSides';
import DropZoneCenter from '../../../Dropzone/DropZoneCenter';
import { DropSideT } from '../../../Dropzone/DropZoneTypes';
import { addTab, addView } from '../../state/dispatchers';
import { validateDraggable } from '../../state';

import _classes from './view.module.css';
import ScrollPane from '../../../ScrollPane';

interface Props {
    portId: ID,
    pageIds: ID[],
    activePageId: ID,
}


const View = ({
    portId,
    pageIds,
    activePageId,
}: Props) => {
    if (pageIds && pageIds.length <= 0) return null;

    const viewRef = useRef<HTMLDivElement>();
    const {
        dispatch,
        state: { pages, styles, classes, template }
    }: TupleContextT = useContext(TupleContext);

    const activePage: PageT = pages[activePageId];

    const viewClassName = `
        ${_classes?.view || ''}
        ${template?.view || ''}
        ${classes?.view  || ''}`;

    const scrollPaneClassName = `
        ${_classes.contentContainer}
        ${classes.scrollPane}`;

    //------------------------------------------------------------------------------------------------------------------
    // Event Handlers
    //------------------------------------------------------------------------------------------------------------------
    const dropSideHandler = (e: DragEvent<Element>, side: DropSideT) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');

        addView(dispatch, portId, dragPortId, dragPageId, side);
    }

    const dropCenterHandler = (e: DragEvent<Element>) => {
        const dragPageId = e.dataTransfer && e.dataTransfer.getData('pageId');
        const dragPortId = e.dataTransfer && e.dataTransfer.getData('portId');

        addTab(dispatch, portId, dragPortId, dragPageId);
    }

    return (
        <div
            ref={viewRef as MutableRefObject<HTMLDivElement>}
            className={viewClassName}
            style={styles?.view}>
            <TabBar portId={portId} pageIds={pageIds} />
            <DropZoneCenter
                style={styles.dropZoneCenter}
                className={classes.dropZoneCenter}
                onDropCB={dropCenterHandler}
                validateDraggable={validateDraggable}>

                <DropZoneSides
                    style={styles.dropZoneSide}
                    className={classes.dropZoneSide}
                    onDropCB={dropSideHandler}
                    validateDraggable={validateDraggable}>

                    <ScrollPane className={scrollPaneClassName} style={styles?.scrollPane || null}>
                        <activePage.component {...activePage.props } />
                    </ScrollPane>

                </DropZoneSides>
            </DropZoneCenter>
        </div>
    );
}

export default View;