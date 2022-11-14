import { Button, List, notification, Modal as ModalAntd } from 'antd';
import React, { useState } from 'react';
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined
} from "@ant-design/icons";
import { deletePet } from '../../../../api/pet';
import AddPetForm from "../addpet";
import EditPetForm from "../editpet";
import Modal from "../../../Modal";



const { confirm } = ModalAntd;


export default function ListPets(props) {
  const { pets, setReloadPets } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addPetModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva mascota");
    setModalContent(
      <AddPetForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPets={setReloadPets}
      />
    );
  };
  return (
    <div>
      <List.Item
        actions={[
          <Button type="primary" onClick={addPetModal}>
            <PlusOutlined />
          </Button>,
        ]}>
      </List.Item>
      <PetsList
        pets={pets}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        setReloadPets={setReloadPets}
      />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  )
}
function PetsList(props) {
  const {
    pets,
    setReloadPets,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;

  const editPet = (pet) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${pet.name_pet ? pet.name_pet : "..."}`
    );
    setModalContent(
      <EditPetForm
        pet={pet}
        setIsVisibleModal={setIsVisibleModal}
        setReloadPets={setReloadPets}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={pets}
      renderItem={(pet) =>
      (
        <PetItem 
        pet={pet}
        editPet={editPet}
          setReloadPets={setReloadPets} />
      )}
    />
  );
}

function PetItem(props) {
  const { pet, editPet, setReloadPets } = props

  const showDeleteConfirm = () => {

    confirm({
      title: "Eliminando mascota",
      content: `¿Estas seguro que quieres eliminar a ${pet.name_pet}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePet(pet._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadPets(true)
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={
        [<Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
        <Button type="primary" onClick={() => editPet(pet)}>
          <EditOutlined />
        </Button>
        ]}
    >
      <List.Item>{pet.name_pet}</List.Item>
    </List.Item>
  )
}

