
import React from 'react';

import { DivSection, Title, TitleTwo } from './App.styled';
import { Form } from '../Form/Form';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number, id }) => {
    const { contacts } = this.state;

    if (contacts.find(item => item.name === name)) {
      return alert(` ${name} is already in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalisedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalisedFilter);
    });
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    // console.log(localContacts);
    const parsedContacts = JSON.parse(localContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <DivSection>
        <Title>PhoneBook</Title>
        <Form onSubmit={this.addContact} />
        <TitleTwo>Contacts</TitleTwo>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList items={visibleContacts} onDelete={this.deleteContact} />
      </DivSection>
    );
  }
}
