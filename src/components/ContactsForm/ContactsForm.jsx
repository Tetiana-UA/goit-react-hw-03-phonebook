import { Component } from "react";
import styles from "./contacts-form.module.css";
import { nanoid } from "nanoid";

const INITIAL_STATE={
    name: '',
    number: '',   
}

class ContactsForm extends Component {

    contactNameId=nanoid();
    contactNumberId=nanoid();

    state = {...INITIAL_STATE}

    handleChange = ({target}) => {
    const {name, value}=target;
    this.setState({
        [name]:value
        
    })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.reset();
    }
    reset(){
    this.setState({...INITIAL_STATE})
    }


    render() {
        
        const{contactNameId, contactNumberId, handleSubmit,handleChange}=this;
        const {name,number}=this.state

        return (

            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.formElement} >
                    <label className={styles.formLabel} htmlFor={contactNameId}>Name</label>
                    <input 
                    className={styles.formInput} 
                    value={name} 
                    type="text" 
                    name="name" 
                    required   
                    id={contactNameId} 
                    onChange={handleChange} 
                    />
                </div>
                <div className={styles.formElement}>
                    <label className={styles.formLabel} htmlFor={contactNumberId}>Number</label>
                    <input 
                    className={styles.formInput} 
                    value={number} 
                    type="tel" 
                    name="number" 
                    required   
                    id={contactNumberId} 
                    onChange={handleChange}
                    />
                </div>
                <button 
                className={styles.formButton} 
                type="submit">
                    Add contact
                </button>
            </form>
        );
    }
}
 
export default ContactsForm;