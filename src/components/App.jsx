import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./app.module.css";


import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsList from "./ContactsList/ContactsList";
import Filter from "./Filter/Filter";

class App extends Component {
  
  state = {
    contacts: [
        
    ],
    filter: '',
  }

  //У 3 домашній роботі  додаємо зберігання контактів телефонної книги в localStorage. Використовуємо методи життєвого циклу. Решта коду з 2 домашньої роботи.
  componentDidMount(){
    const contacts=JSON.parse(localStorage.getItem("my-contacts"));
    if(contacts?.length){
        this.setState({
          contacts, 
        })
    }
}
  componentDidUpdate(_, prevState) {
  const{contacts}=this.state;
  if(prevState.contacts.length !== contacts.length){
    console.log("update contacts");
    localStorage.setItem("my-contacts", JSON.stringify(this.state.contacts) )
  }
}


//Перевіряємо на повтори контактів при введенні
  isDublicate ({name,number}) {
    const{contacts}=this.state;
    console.log("name");

    const normalizedName=name.toLowerCase();
    const normalizedNumber=number.toLowerCase();

    const dublicate=contacts.find(item=>{
      const normalizedCurrentName=item.name.toLowerCase();
      const normalizedCurrentNumber=item.number.toLowerCase();
      return (normalizedCurrentName === normalizedName || normalizedCurrentNumber === normalizedNumber );
    })
    return Boolean(dublicate);
    
  }


  addContact = (data) => {
    if(this.isDublicate(data)) {
      console.log(data);
      return alert (`Contact with ${data.name} and ${data.number} already in list`)
    }
    this.setState(({contacts}) => {
      const newContact={
        id:nanoid(),
        ...data,
      }
      return {
        contacts:[...contacts, newContact]
      } 
    })
    }

  deleteContact =(id)=>{
    this.setState(({contacts}) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return{
        contacts:newContacts,
      }
    })
  }

  changeFilter = ({target}) =>{
    this.setState({
      filter:target.value
    })
  }

  getFilteredContacts (){
  const {filter, contacts} =this.state;

        if (!filter){
          return contacts;
        }
    
        const normalizedFilter=filter.toLowerCase();
    
        const filteredContacts = contacts.filter(({name}) => {
        const normalizedName=name.toLowerCase();
        return (normalizedName.includes(normalizedFilter))
    });
    return filteredContacts;
    }
  

  render() { 
    const {addContact, deleteContact, changeFilter}=this;
    const contacts=this.getFilteredContacts();

    return (
        <div className={styles.wraper}>
        <h2 className={styles.title}>PhoneBook</h2>
        <ContactsForm onSubmit={addContact}/>

        <h2 className={styles.title}>Contacts</h2>
        <Filter changeFilter={changeFilter} filter={this.state.filter}/>
        <ContactsList items={contacts} deleteContact={deleteContact}/>
        </div>
 

    );
  }
}
 
export default App;