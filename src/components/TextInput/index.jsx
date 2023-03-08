import './styles.css';

export const TextInput = ({searchValue, handleSearch}) => {
    return (
        <input type="search" onChange={handleSearch} value={searchValue} className="text-input" placeholder='type your search'/>
    )
} 