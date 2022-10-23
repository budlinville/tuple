import {
    useState,
    useRef,
    MouseEvent,
    ReactNode,
    CSSProperties,
    Children,
    useEffect,
    MutableRefObject,
} from 'react'

import _classes from './splitpane.module.css';
import {DirectionT} from '../../types';


const validateSplitPane = (direction: DirectionT, children: Array<ReactNode>) => {
    if (children.length > 2) throw new Error('SplitPane can only take a maximum of two children');
    if (children.length < 1) throw new Error('SplitPane needs at least one child');

    if (direction == 'none' && children.length !== 1)
        console.warn('Views with diection "none" should have one and only one child.');
    
    if ((direction == 'horizontal' || direction == 'vertical') && children.length !== 2)
        throw new Error(`"${direction}" views require two children`);
};


interface Props {
    dir?: DirectionT,
    width?: number | string,
    height?: number | string,
    resizerPos?: number | string,
    resizable?: boolean,
    children: ReactNode,
    onResize?: ((e: MouseEvent) => null) | null,
}


const SplitPane = ({
    dir='horizontal',
    width='100%',
    height='100%',
    resizerPos='50%',
    resizable=true,
    children,
    onResize=null,
}: Props) => {
    const childrenArr = Children.toArray(children);
    validateSplitPane(dir, childrenArr);

    const containerRef = useRef<HTMLDivElement>();
    const headRef = useRef<HTMLDivElement>();
    const resizerRef = useRef<HTMLDivElement>();
    const tailRef = useRef<HTMLDivElement>();

    const [resizing, setResizing] = useState<boolean>(false);
    const [headLength, setHeadLength] = useState<number | string>(resizerPos);
    const [mousePos, setMousePos] = useState<number>(0);

    useEffect(() => {
        // After first render, make sure headLength is number
        const headLen = dir === 'horizontal'
            ? headRef.current?.offsetWidth as number
            : headRef.current?.offsetHeight as number;
        setHeadLength(headLen);
    }, [resizerPos, headRef, setHeadLength]);

    const mouseDownHandler = (e: MouseEvent) => {
        if (dir === 'horizontal') {
            setResizing(true);
            setMousePos(e.clientX);
            setHeadLength(headRef.current?.offsetWidth as number);
        } else if (dir === 'vertical') {
            setResizing(true);
            setMousePos(e.clientY);
            setHeadLength(headRef.current?.offsetHeight as number);
        }

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
        if (!resizing) return;

        const container = containerRef.current as HTMLDivElement;
        const head = headRef.current as HTMLDivElement;

        if (dir === 'horizontal') {
            const deltaX = e.clientX - mousePos;
            const offsetWidth = containerRef.current?.offsetWidth as number;
            const newHeadLength = (((headLength as number) + deltaX) * 100) / offsetWidth;
            container.style.cursor = 'w-resize';
            head.style.width = `${newHeadLength}%`;
        } else if (dir === 'vertical') {
            const deltaY = e.clientY - mousePos;
            const offsetHeight = containerRef.current?.offsetHeight as number;
            const newHeadLength = (((headLength as number) + deltaY) * 100) / offsetHeight;
            container.style.cursor = 'n-resize';
            head.style.height = `${newHeadLength}%`;
        }

        onResize && onResize(e);

        e.stopPropagation();
        e.preventDefault();
    };

    const mouseUpHandler = (e: MouseEvent) => {
        setResizing(false);
        const container = containerRef.current as HTMLDivElement;
        container.style.cursor = 'default';

        e.stopPropagation();
        e.preventDefault();
    };

    const containerStyle: CSSProperties = { width, height };
    let headStyle: CSSProperties = {};

    let containerClassName: string = _classes.container;
    const headClassName: string = `${_classes.noScrollbar} ${_classes.pane} ${_classes.paneHead}`;
    let resizerClassName: string = _classes.resizer;
    const tailClassName: string = `${_classes.noScrollbar} ${_classes.pane} ${_classes.paneTail}`;

    switch(dir) {
        case 'horizontal':
            headStyle = { ...headStyle, width: headLength };
            resizerClassName = `${resizerClassName} ${_classes.resizerHorizontal}`;
            break;
        case 'vertical':
            containerClassName = `${_classes.container} ${_classes.containerVertical}`;
            headStyle = { ...headStyle, height: headLength };
            resizerClassName = `${resizerClassName} ${_classes.resizerVertical}`;
            break;
        case 'none':
        default:
            if (childrenArr.length != 1)
                throw 'Only one child allowed unless dir paramater is set to "horizontal" or "vertical"';
    }

    return (
        <div ref={containerRef as MutableRefObject<HTMLDivElement>}
            style={containerStyle}
            className={containerClassName}
            onMouseMove={mouseMoveHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}
        >
            <div ref={headRef as MutableRefObject<HTMLDivElement>}
                className={headClassName}
                style={headStyle}
            >
                { childrenArr && childrenArr[0] }
                { resizable &&
                    <div ref={ resizerRef as MutableRefObject<HTMLDivElement> }
                        className={resizerClassName}
                        onMouseDown={mouseDownHandler}/>
                }
            </div>
            <div ref={ tailRef  as MutableRefObject<HTMLDivElement> }
                className={tailClassName}
            >
                { dir !== 'none' && childrenArr && childrenArr[1] }
            </div>
        </div>
    );
}


export default SplitPane;