import React from 'react';
import { SearchIcon } from '../../Icons/Search';
import s from '../Menu.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={s.searchWrapper}>
      <SearchIcon />
      <input
        className={s.search}
        type="search"
        id="search-queues"
        placeholder="Filter queues"
        value={value}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
      />
    </div>
  );
}; 