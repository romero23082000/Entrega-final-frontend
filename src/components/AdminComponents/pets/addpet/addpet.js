import { Button, Col, Form, Input, notification, Row } from 'antd';
import React, { useState } from 'react'
import { addPetDB } from '../../../../api/pet';


export default function EditPet(props) {
    const { setIsVisibleModal, setReloadPets } = props;
    const [petData, setPetData] = useState({});

    const addPet = (event) => {
        event.preventDefault();
        if (
            !petData.name_pet ||
            !petData.raza_pet ||
            !petData.color_pet ||
            !petData.age_pet ||
            !petData.weight_pet ||
            !petData.datBith_pet
        ) {
            notification["error"]({
                message: "Todos los campos son obligatorios.",
            });
        } else {
            addPetDB(petData)
                .then((response) => {
                    notification["success"]({
                        message: response,
                    });
                    setIsVisibleModal(false);
                    setReloadPets(true);
                    setPetData({});
                })
                .catch((err) => {
                    notification["error"]({
                        message: err,
                    });
                });
        }
    }
    return (
        <div className="add-user-form">
            <AddForm
                petData={petData}
                setPetData={setPetData}
                addPet={addPet}
            />
        </div>
    )
}

const AddForm = (props) => {
    const { petData, setPetData, addPet } = props;
    return(
        <Form>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Nombre"
                        value={petData.name_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, name_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Raza"
                        value={petData.raza_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, raza_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Edad"
                        value={petData.age_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, age_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Color"
                        value={petData.color_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, color_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Peso"
                        value={petData.weight_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, weight_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Cumpleaños"
                        value={petData.datBith_pet}
                        onChange={(e) =>
                          setPetData({ ...petData, datBith_pet: e.target.value })
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addPet}
        >
          Crear Mascota
        </Button>
      </Form.Item>
    </Form>
    )
}
