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
  }, [debouncedValue, dispatch, searchWord]);

  return (
    <div className="search">
      <div className="search-inner">
        {/* <SearchIcon className="search-icon" /> */}
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
