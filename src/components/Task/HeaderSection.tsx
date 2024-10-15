import React, {FC} from 'react';

interface IHeaderSection{
    text: string,
    bg: string,
    count: number
}
const HeaderSection: FC <IHeaderSection> = ({text, bg, count}) => {
    return (
        <div className={`${bg} flex items-center gap-2 h-12 pl-4 text-white text-sm rounded-md uppercase`}>
            {text}
            <div>
                {count}
            </div>
        </div>
    );
};

export default HeaderSection;