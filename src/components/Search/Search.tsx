import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../helpers/hooks/redux';
import useDebounce from '../../helpers/hooks/useDebounce';
import { searchFoods } from '../../store/slices/foodSlice';
import './Search.css';

function Search() {
  const dispatch = useAppDispatch();
  const [searchWord, setSearchWord] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchWord, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  useEffect(() => {
    dispatch(searchFoods(searchWord));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, dispatch]);

  return (
    <div className="search">
      <div className="search-inner">
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
        >
          <path d="M19.25 19.25 15.5 15.5M4.75 11a6.25 6.25 0 1 1 12.5 0 6.25 6.25 0 0 1-12.5 0Z" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск"
          value={searchWord}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Search;
