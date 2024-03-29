import { initialViewport } from ".";
import { getUniqueId } from "../../../utils";
import { SideT } from "../../SplitPane/SplitPaneTypes";
import {
    AddNewViewPayloadT,
    AddTabPayloadT,
    AddViewPayloadT,
    ChangeActiveViewPayloadT,
    ID,
    RemoveTabPayloadT,
    RemoveViewPayloadT,
    TupleStateT
} from "../TupleTypes";

import {
    IdPortPairT,
    PortsT,
    ViewportStateT,
    PortT,
} from "../Viewport/ViewportTypes";


const _log_action = (label: string, state: any, payload: any) => {
    console.log(`----- ${label} -----`);
    console.log('state', state);
    console.log('payload', payload);
}

//---------------------------------------------------------------------------------------------------------------------
// Viewport State actions
//---------------------------------------------------------------------------------------------------------------------
export const _get_port_copy = (ports: PortsT, id: ID): PortT => {
    const port = { ...ports[id] };
    return port || null;
}

//---------------------------------------------------------------------------------------------------------------------
export const _get_sister_details = (viewportState: ViewportStateT, id: ID): IdPortPairT | null => {
    const port: PortT = viewportState.ports[id];
    if (!port) return null;

    const isRoot: boolean = port.parentId == null;
    if (isRoot) return null;

    const parent: PortT = viewportState.ports[port.parentId as ID];
    if (!parent) return null;

    const sisterId: ID = port.isHead ? parent.tailId as ID : parent.headId as ID;
    const sister = _get_port_copy(viewportState.ports, sisterId);

    return {
        id: sisterId,
        port: sister,
    } as IdPortPairT;
}


//---------------------------------------------------------------------------------------------------------------------
export const _add_tab = (state: TupleStateT, payload: AddTabPayloadT): TupleStateT => {
    // _log_action('Add Tab', state, payload);

    if (payload.portId === payload.dragPortId) {
        const newPorts = {
            ...state.viewport.ports,
            [payload.portId]: {
                ...state.viewport.ports[payload.portId],
                activePageId: payload.pageId,
            }
        }
        return {
            ...state,
            viewport: {
                ...state.viewport,
                skipTabRemoval: true,
                ports: newPorts,
            }
        };
    }

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) throw Error('Page ids is null. Was this action called on a Splitview port?');
    if (pageIds.includes(payload.pageId)) {
        const newPorts: PortsT = {
            ...state.viewport.ports,
            [payload.portId]: {
                ...port,
                activePageId: payload.pageId,
            }
        };

        return {
            ...state,
            viewport: {
                ...state.viewport,
                ports: newPorts
            }
        }
    }

    const newPageIds = [
        ...pageIds?.slice(0, payload.index),
        payload.pageId,
        ...pageIds?.slice(payload.index),
    ];

    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            activePageId: payload.pageId,
            pageIds: newPageIds,
        }
    }

    return {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    } as TupleStateT;
}

//---------------------------------------------------------------------------------------------------------------------
export const _remove_tab = (state: TupleStateT, payload: RemoveTabPayloadT): TupleStateT => {
    // _log_action('Remove Tab', state, payload);

    if (state.viewport.skipTabRemoval) {
        return {
            ...state,
            viewport: {
                ...state.viewport,
                skipTabRemoval: false
            }
        };
    }

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const pageIds = port.pageIds;
    if (!pageIds) return state;

    const newPageIds = pageIds.filter((_, i) => i !== payload.index);

    const newActivePageId = pageIds[payload.index] != port.activePageId
        ? port.activePageId
        : pageIds[payload.index+1] || pageIds[payload.index-1];
    
    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            pageIds: newPageIds,
            activePageId: newActivePageId,
        }
    }

    return {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    } as TupleStateT;
}


//---------------------------------------------------------------------------------------------------------------------
// Add single view to empty viewport
export const _add_new_view = (state: TupleStateT, payload: AddNewViewPayloadT): TupleStateT => {
    if (Object.keys(state.viewport.ports).length !== 0) {
        throw Error('_add_new_view() should only be called on an empty viewport. Otherwise call _add_view()');
    }

    const newPortId = getUniqueId();
    const newPorts = {
        [`${newPortId}`]: {
            parentId: null,
            isSplitView: false,
            pageIds: [payload.pageId],
            activePageId: payload.pageId,
            direction: null,
            headId: null,
            tailId: null,
            isHead: null,
        }
    };

    return {
        ...state,
        viewport: {
            // ...state.viewport,
            root: newPortId,
            ports: newPorts,
        }
    } as TupleStateT;
};

//---------------------------------------------------------------------------------------------------------------------
// Create a new splitview port with children as original port and new tab
/*
    Will turn:
            (Parent)
               |
            (Port)

    Into:
             (Parent)
                |
            (New Port)
              /    \
         (Port)    (New Child)
*/
export const _add_view = (state: TupleStateT, payload: AddViewPayloadT): TupleStateT => {
    // _log_action('Add View', state, payload);

    const newPortId = getUniqueId();
    const newChildId = getUniqueId();

    const port = _get_port_copy(state.viewport.ports, payload.portId);
    const isRoot = !port.parentId;

    // If dropped on same port the drag started from, remove the original pageId to avoid duplicates
    if (payload.dragPortId === payload.portId) {
        port.pageIds = port.pageIds?.filter(item => item !== payload.pageId) as ID[];
    }

    const newChild: PortT = {
        parentId: newPortId,
        isSplitView: false,
        pageIds: [payload.pageId],
        activePageId: payload.pageId,
        direction: null,
        headId: null,
        tailId: null,
        isHead: payload.side === SideT.HEAD,
    };

    const newPort = {
        parentId: port.parentId,
        isSplitView: true,
        pageIds: null,
        activePageId: null,
        direction: payload.direction,
        headId: payload.side === SideT.HEAD ? newChildId : payload.portId,
        tailId: payload.side === SideT.TAIL ? newChildId : payload.portId,
        isHead: port.isHead,
    }

    const newPorts = {
        ...state.viewport.ports,
        [`${newPortId}`]: newPort,      // parent
        [`${newChildId}`]: newChild,    // child
    }

    // If not the root, handle changes to parent
    if (!isRoot) {
        const parent = _get_port_copy(state.viewport.ports, port.parentId as ID);
        if (port.isHead)
            parent.headId = newPortId;

        if (port.isHead !== null && !port.isHead)
            parent.tailId = newPortId;

        newPorts[port.parentId as ID] = parent;  // grandparent
    }

    // Add back updated port
    port.parentId = newPortId;
    port.isHead = payload.side === SideT.TAIL;
    port.activePageId = port.activePageId === payload.pageId
        ? port.pageIds && port.pageIds[0]
        : port.activePageId;

    newPorts[payload.portId] = port;
    
    return {
        ...state,
        viewport: {
            // ...state.viewport,
            root: isRoot ? newPortId : state.viewport.root,
            ports: newPorts,
        }
    } as TupleStateT;
}

//---------------------------------------------------------------------------------------------------------------------
// Remove => Replace parent with sister component
export const _remove_view = (state: TupleStateT, payload: RemoveViewPayloadT): TupleStateT => {
    // _log_action('Remove View', state, payload);

    // React's Strict mode will cause duplicate renders, which
    // will cause this action to be called twice. This check
    // returns the correct state on the second call.
    const portKeys = Object.keys(state.viewport.ports)
    if (!portKeys.includes(payload.portId.toString())) {
        return state;
    }

    let rootId: ID = state.viewport.root;
    let port = _get_port_copy(state.viewport.ports, payload.portId);
    const isRoot = !port.parentId;

    if (isRoot) {
        return {
            ...state,
            viewport: initialViewport,
        }
    }

    const parent = _get_port_copy(state.viewport.ports, port.parentId as ID);
    const parentIsRoot = !parent.parentId;
    const sister = _get_sister_details(state.viewport, payload.portId);

    const newPorts: PortsT = { ...state.viewport.ports };

    if (parentIsRoot) {
        if (sister) {
            rootId = sister.id;

            sister.port.parentId = null;
            sister.port.isHead = null;
            newPorts[sister.id] = sister.port;
        }
    } else {
        const grandparentId: ID = parent.parentId as ID;
        const grandparent  = _get_port_copy(state.viewport.ports, grandparentId);

        if (parent.isHead) {
            grandparent.headId = sister?.id as ID;
        } else {
            grandparent.tailId = sister?.id as ID;
        }

        if (sister) {
            sister.port.parentId = grandparentId as ID;
            sister.port.isHead = parent.isHead;

            newPorts[sister.id] = sister.port;
        }

        newPorts[grandparentId] = grandparent;
    }

    delete newPorts[payload.portId];
    delete newPorts[port.parentId as ID];

    return {
        ...state,
        viewport: {
            //...state.viewport
            root: rootId,
            ports: newPorts,
        }
    } as TupleStateT;
}


//---------------------------------------------------------------------------------------------------------------------
export const _change_active_view = (state: TupleStateT, payload: ChangeActiveViewPayloadT): TupleStateT => {
    // _log_action('Change Active View', state, payload);

    const port = _get_port_copy(state.viewport.ports, payload.portId);

    const newPorts = {
        ...state.viewport.ports,
        [`${payload.portId}`]: {
            ...port,
            activePageId: payload.pageId,
        }
    };

    const newState = {
        ...state,
        viewport: {
            ...state.viewport,
            ports: newPorts,
        }
    } as TupleStateT;

    return newState; 
}
