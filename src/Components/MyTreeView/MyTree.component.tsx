import React from 'react';
import * as types from '../../utils/types';

import {
  HeaderStyles,
  ContainerStyles,
  ListContainerStyles,
  ListItemsStyles,
} from './MyTree.styles';

interface accType {
  data: types.sortedType[];
}

const renderCats = (cats: string[], gender: string) => {
  return (
    <ListContainerStyles aria-labelledby={gender}>
      {cats.map((cat) => (
        <ListItemsStyles aria-label={cat} key={cat}>
          {cat}
        </ListItemsStyles>
      ))}
    </ListContainerStyles>
  );
};

const MyTree: React.FC<accType> = ({ data }) => {
  return (
    <ContainerStyles>
      {data.map((el: types.sortedType) => {
        return (
          <div key={el.gender}>
            <HeaderStyles id={el.gender}>{el.gender}</HeaderStyles>
            {renderCats(el.cats, el.gender)}
          </div>
        );
      })}
    </ContainerStyles>
  );
};

export default MyTree;
