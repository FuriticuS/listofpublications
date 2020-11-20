import React, {useState} from 'react';
import {block} from 'bem-cn';

import './filter.scss';

const cn = block("filter");

const Filter = ({getQuery}) => {

    const [text, setText] = useState('');

    const onChanged = (e) => {
        setText(e)
        getQuery(e);
    }

    return (
        <div className={cn()}>
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search name"
                    value={text}
                    onChange={(e) => onChanged(e.target.value)}
                    autoFocus
                />
            </form>
        </div>
    );
};

export default Filter;
