import React, {FC} from 'react';
import styles from './style.module.scss';

interface IHeaderSection{
    text: string,
    bg: string,
    count: number
}
const HeaderSection: FC <IHeaderSection> = ({text, bg, count}) => {
    return (
        <div className={`${bg} ` + styles.headerSection}>
            {text}
            <div>
                {count}
            </div>
        </div>
    );
};

export default HeaderSection;