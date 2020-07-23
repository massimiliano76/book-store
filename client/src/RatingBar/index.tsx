import React from 'react';
import { Rating } from 'semantic-ui-react';
import { RatingProps } from '../types';

const RatingBar = ({ rating }: RatingProps) => {
    return (
        <div className='rating-bar'>
            <Rating icon='star' disabled rating={ rating } maxRating={ 5 }/>
        </div>
    );
};

export default RatingBar;