import React, { useState, useEffect } from 'react';

import MyTree from '../MyTreeView/MyTree.component';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

import type { sortedType, personDetailsType } from '../../utils/types';

interface accType {
  Male: string[];
  Female: string[];
}

const CatList: React.FC = () => {
  const [catsData, setCatsData] = useState<sortedType[]>([]);
  const [error, setError] = useState('');
  let active = false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        active = true;
        const response = await fetch(
          `https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json`
        );
        const data = await response.json();
        const catsByGender = data.reduce(
          (acc: accType, el: personDetailsType) => {
            if (el.pets) {
              for (let pet of el.pets) {
                if (pet.type === 'Cat') {
                  acc[el.gender].push(pet.name);
                }
              }
            }
            return acc;
          },
          { Male: [], Female: [] }
        );
        const sortedCats = Object.keys(catsByGender).reduce(
          (acc: sortedType[], item: string) => {
            acc.push({
              gender: item,
              cats: insertionSort(catsByGender[item]),
            });
            return acc;
          },
          []
        );
        if (!active) return;
        setCatsData(sortedCats);
      } catch (error) {
        if (!active) return;
        setError('Something went wrong');
      }
    };
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const insertionSort = (arr: string[]) => {
    for (let i = 1; i < arr.length; i++) {
      let currentItem = arr[i];
      let j = i - 1;
      for (j; j >= 0 && arr[j].localeCompare(currentItem) > 0; j--) {
        arr[j + 1] = arr[j];
      }
      arr[j + 1] = currentItem;
    }
    return arr;
  };

  return (
    <>
      {!error ? <MyTree data={catsData} /> : <ErrorMessage message={error} />}
    </>
  );
};

export default CatList;
