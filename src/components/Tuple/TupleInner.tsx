//----------------------------------------------------------------------------------------------------------------------
// The Tuple component tree that is actually displayed
//----------------------------------------------------------------------------------------------------------------------

import { useContext } from 'react';

import Tree from './Tree/Tree';
import Viewport from './Viewport/Viewport';
import SplitPane from '../SplitPane';
import { TupleContext } from '.';
import { TupleContextT } from './TupleTypes';

import _classes from './tuple.module.css';
import { get_viewport_id_from_query_params } from './state/browser-actions';


const TupleInner = () => {
    const { state: {
        styles,
        classes,
        template,
    }}: TupleContextT = useContext(TupleContext);

    const isRootViewport = get_viewport_id_from_query_params() === '';

    const tupleClassName = `
        ${_classes?.tuple || ''}
        ${template?.tuple || ''}
        ${classes?.tuple  || ''}`;

    // TODO: This needs to be better
    const DefaultView = <>No Views. SAD!</>

    if (!isRootViewport) {
        return <Viewport defaultView={DefaultView} />;
    }

    return (
        <div className={tupleClassName} style={styles.tuple}>
            <SplitPane resizerPos='25%'>
                <Tree />
                <Viewport defaultView={DefaultView} />
            </SplitPane>
        </div>
    );
}


export default TupleInner;