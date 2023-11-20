import { useState } from "react";
import Input from "../Input";
import UserCard from "../UserCard/UserCard";

import { v4 as getUniqueId } from "uuid";

import styles from "./registrationForm.module.css";

const DEFAULT_USERS = [
  {
    name: "Lev",
    surname: "Voker",
    email: "lev@gmail.com",
    id: getUniqueId(),
  },
  {
    name: "Sam",
    surname: "Smidth",
    email: "sam@gmail.com",
    id: getUniqueId(),
  },
  {
    name: "Nina",
    surname: "Fox",
    email: "nina@gmail.com",
    id: getUniqueId(),
  },
  {
    name: "Tom",
    surname: "Riveb",
    email: "tom@gmail.com",
    id: getUniqueId(),
  },
];

const RegistrationForm = () => {
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();

  const onAddUser = () => {
    const user = {
      name,
      surname,
      email,
      id: getUniqueId(),
    };

    setUsers([...users, user]);
    setName("");
    setSurname("");
    setEmail("");
  };

  const onSaveUser = () => {
    const selectedUser = users.find((user) => user.id === selectedUserId);

    selectedUser.name = name;
    selectedUser.surname = surname;
    selectedUser.email = email;

    setName("");
    setSurname("");
    setEmail("");
    setIsEditMode(false);
  };

  const onGetName = (value) => {
    setName(value);
  };

  const onGetSurname = (value) => {
    setSurname(value);
  };

  const onGetEmail = (value) => {
    setEmail(value);
  };

  const onDeleteUserHandler = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const onUpdateUserHandler = (id) => {
    const currentUser = users.filter((user) => user.id === id)[0];

    setName(currentUser.name);
    setSurname(currentUser.surname);
    setEmail(currentUser.email);
    setIsEditMode(true);
    setSelectedUserId(id);
  };

  return (
    <div className={styles["common"]}>
      <div className={styles["left-side"]}>
        <Input
          label="Name: "
          placeholder="Enter Your Name"
          onChangeFunction={onGetName}
          value={name}
        />
        <Input
          label="Surname: "
          placeholder="Enter Your Surname"
          onChangeFunction={onGetSurname}
          value={surname}
        />
        <Input
          label="Email: "
          placeholder="Enter Your Email"
          onChangeFunction={onGetEmail}
          value={email}
        />
        {isEditMode ? (
          <button
            type="button"
            onClick={onSaveUser}
            className={styles["add-user-button"]}
          >
            Save User
          </button>
        ) : (
          <button
            type="button"
            onClick={onAddUser}
            className={styles["add-user-button"]}
          >
            Add User
          </button>
        )}
      </div>
      <div className={styles["right-side"]}>
        <div className={styles["users-list"]}>
          {users.map((user, index) => {
            const { name, surname, email, id } = user;
            return (
              <UserCard
                key={index}
                name={name}
                surname={surname}
                email={email}
                id={id}
                onClickDeleteBtn={onDeleteUserHandler}
                onClickUpdateBtn={onUpdateUserHandler}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
