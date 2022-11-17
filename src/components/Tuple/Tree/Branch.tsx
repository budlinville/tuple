import {
    ReactNode,
    useState,
    useContext
} from 'react'
import { TupleContext } from '..';
import { TupleContextT } from '../TupleTypes';

import _classes from './tree.module.css';


interface Props {
    text: string,
    children: ReactNode,
    open?: boolean,
}


const Branch = ({
    text,
    children,
    open=false,
}: Props) => {
    const onClick = () => setExpanded(cur => !cur);

    const [expanded, setExpanded] = useState(open);
    const {state:{ classes, styles }}: TupleContextT = useContext(TupleContext);

    const branchClassName = `${_classes.branch} ${classes.branch} `;
    const branchesClassName = `${_classes.branches} ${classes.branches}`;
    
    return (
        <div>
            <div
                className={branchClassName}
                style={styles.branch}
                onClick={onClick}>
                { text }
            </div>
            { expanded && <div
                className={branchesClassName}
                style={styles.branches}>
                { children }
            </div> }
        </div>
    );
}


export default Branch;
