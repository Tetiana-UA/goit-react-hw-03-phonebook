import styles from "./filter.module.css";

const Filter = ({filter, changeFilter}) => {
    

    return (
        <div className={styles.filter}> 
        <label 
        className={styles.filterLabel}>
            Find contacts by name
        </label>
        <input 
        className={styles.filterInput} 
        onChange={changeFilter} 
        value={filter} 
        name="filter"/>
        </div>
    )
}

export default Filter;