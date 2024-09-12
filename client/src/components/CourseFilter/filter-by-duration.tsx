import React, { useEffect, useState } from 'react';
import './course-filter.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  categoryCounter,
  changeState,
  valueOfCurrentCategory,
  valueOfTypeDuration
} from '../../redux/atoms';
import { AddFilterQueryString } from '../../utils/allFunctions';

const FilterByDuration = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSubjectFilter, setShowSubjectFilter] = useState(true);
  const setValueDuration = useSetRecoilState(valueOfTypeDuration);
  const [currentCategorieValue, setValue0fCurrentCategory] = useRecoilState(
    valueOfCurrentCategory
  );

  const setChangeState = useSetRecoilState(changeState);
  const [counterForCategory, setCounterForcategory] =
    useRecoilState(categoryCounter);

  // État local pour gérer les cases cochées
  const [checkedState, setCheckedState] = useState({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '>1h': false, // eslint-disable-next-line @typescript-eslint/naming-convention
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '1>5h': false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '>5h': false
  });

  // Charger l'état des cases cochées depuis le localStorage au montage du composant
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const savedState = JSON.parse(
      localStorage.getItem('filterDurationState') || '{}'
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (savedState && Object.keys(savedState).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCheckedState(savedState);
    }
  }, []);

  // Sauvegarder l'état des cases cochées dans le localStorage à chaque modification
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localStorage.setItem('filterDurationState', JSON.stringify(checkedState));
  }, [checkedState]);

  // Met à jour les états dans Recoil et le localStorage
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setCheckedState(prevState => {
      const updatedState = { ...prevState, [value]: checked };

      // Mettre à jour les états dans Recoil
      setValueDuration(value);
      AddFilterQueryString('durée', value);
      setCounterForcategory(
        counterForCategory >= 0 && checked
          ? counterForCategory + 1
          : counterForCategory > 0 && !checked
          ? counterForCategory - 1
          : counterForCategory
      );
      setChangeState(false);
      setValue0fCurrentCategory(currentCategorieValue);
      console.log(showFilter);

      return updatedState;
    });
  };

  return (
    <div className='filter-container'>
      <div className='main-title-filter-container'>
        <svg
          onClick={() => {
            setShowFilter(e => !e);
          }}
          width='30px'
          height='30px'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z'></path>
        </svg>
      </div>
      <details className='filter__contenaire' open>
        <summary
          onClick={() => setShowSubjectFilter(e => !e)}
          className='filter-title-container'
        >
          <p className='filter-title'>Durée</p>
          {showSubjectFilter ? (
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='24' height='24' fill='white' />
              <path d='M7 14.5L12 9.5L17 14.5' stroke='#000000' />
            </svg>
          ) : (
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='24' height='24' fill='white' />
              <path d='M17 9.5L12 14.5L7 9.5' stroke='#000000' />
            </svg>
          )}
        </summary>
        <ul className='filter-items-container'>
          <div className='language-filter'>
            <label className='language__Label'>
              <input
                type='checkbox'
                value='>1h'
                checked={checkedState['>1h']}
                onChange={handleCheckboxChange}
              />
              Moins d&apos;1 heure
            </label>
            <label className='language__Label'>
              <input
                type='checkbox'
                value='1>5h'
                checked={checkedState['1>5h']}
                onChange={handleCheckboxChange}
              />
              1 à 5 heures
            </label>
            <label className='language__Label'>
              <input
                type='checkbox'
                value='>5h'
                checked={checkedState['>5h']}
                onChange={handleCheckboxChange}
              />
              5+ heures
            </label>
          </div>
        </ul>
      </details>
    </div>
  );
};

FilterByDuration.displayName = 'FilterByDuration';
export default FilterByDuration;
