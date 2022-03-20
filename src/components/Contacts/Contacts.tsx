import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, setLoader } from "../../redux/actions";
import CircularIndeterminate from "../CircularIndeterminate/CircularIndeterminate";
import { IContact, IStore } from "../../types/types";
import axios from "axios";
import "./Contacts.css";

export default function CheckboxListSecondary() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IStore) => state.user.currentUser);
  const isLoading = useSelector((state: IStore) => state.loader.isLoading);
  const [contacts, setContacts] = React.useState<IContact[]>([]);
  const [contactData, setContactData] = React.useState<IContact>({});
  const [contactName, setContactName] = React.useState<string>("");
  const [modalType, setModalType] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  //Открытие и закрытие модального окна
  const handleOpen = (type: string): void => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = (): void => setOpen(false);

  //Controlled инпут
  const handleChangeName = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setContactName(evt.target.value);
  };
  //Реквесты на изменение удаление и добавления контакта
  const editNameRequest = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    axios
      .patch(`http://localhost:3001/contacts/${contactData.id}`, contactData)
      .catch((e: Error | any) => console.log(e));
    setContactData({ ...contactData, name: contactName });
    handleClose();
  };

  const addContactRequest = (evt: any): void => {
    evt.preventDefault();
    axios
      .post(`http://localhost:3001/contacts/`, {
        avatar: "https://i.postimg.cc/50mxs7tF/avatar-icon.jpg",
        userId: currentUser.id,
        name: contactName,
      })
      .then((res) => {
        setContacts([...contacts, res.data]);
      })
      .catch((e: Error | any) => console.log(e));

    handleClose();
  };

  const handDeleteContact = (data: IContact): void => {
    axios
      .delete(`http://localhost:3001/contacts/${data.id}`)
      .catch((e: any) => console.log(e));
    setContactData({ ...data, userId: null });
  };

  //Еффекты для реактивности и получения данных на старте
  React.useEffect(() => {
    setContacts(
      contacts
        .filter((data) => {
          if (data.id === contactData.id && contactData.userId === null) {
            return false;
          }
          return true;
        })
        .map((data) => {
          if (data.id === contactData.id) {
            return contactData;
          }
          return data;
        })
    );
  }, [contactData]);

  React.useEffect(() => {
    dispatch(setLoader(true));
    fetch(`http://localhost:3001/contacts?userId=${String(currentUser.id)}`)
      .then((response) => response.json())
      .then((people: IContact[]) => setContacts(people))
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoader(false)));
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <h1 className="contacts__title">Контакты</h1>
      <div className="contacts__add-button ">
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => {
            setContactName("");
            handleOpen("add");
          }}
        >
          Добавить контакт
        </Button>
      </div>
      {isLoading ? (
        <CircularIndeterminate></CircularIndeterminate>
      ) : (
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {contacts.map((contact) => {
            return (
              <ListItem key={contact.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${contact.name}`}
                      src={contact.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={contact.name} />
                </ListItem>
                <Button
                  onClick={() => {
                    handleOpen("edit");
                    setContactData(contact);
                    setContactName(contact.name || "");
                  }}
                >
                  Edit
                </Button>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handDeleteContact(contact);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <div className="contacts__exit">
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            dispatch(loggedIn(false));
            localStorage.clear();
          }}
        >
          Выйти из аккаунта
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="contacts__modal"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            required
            id="outlined-required"
            label="Required"
            value={contactName}
            placeholder={contactName || "Введите имя"}
            onChange={handleChangeName}
          />
          {modalType === "add" ? (
            <Button
              className="contacts__action-button"
              type="submit"
              variant="outlined"
              size="small"
              onClick={addContactRequest}
            >
              Добавить
            </Button>
          ) : (
            modalType === "edit" && (
              <Button
                className="contacts__action-button"
                type="submit"
                variant="outlined"
                size="small"
                onClick={editNameRequest}
              >
                Редактировать
              </Button>
            )
          )}
        </Box>
      </Modal>
    </Container>
  );
}
