import styles from "./contacts-list.module.css";

const ContactsList = ({items,deleteContact}) => {
    const elements=items.map(({id, name, number}) =>
    <li 
    className={styles.listLi} 
    key={id}>{name}:  {number} 
    <button className={styles.listButton} onClick={()=>deleteContact(id)} type="button">Delete</button>
    </li>)

    return (
        <ol className={styles.list}>
            {elements}
        </ol>
    )
}
export default ContactsList;