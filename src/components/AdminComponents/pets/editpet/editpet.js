import { Button, Col, Form, Input, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { editPetDB } from '../../../../api/pet';


export default function EditPetForm(props) {
    const { pet, setIsVisibleModal, setReloadPets } = props;
    console.log("data original", pet)
    const [petData, setPetData] = useState({
        name_pet: pet.name_pet,
        color_pet: pet.color_pet,
        raza_pet: pet.raza_pet,
        weight_pet: pet.weight_pet,
        datBith_pet: pet.datBith_pet,
        age_pet: pet.age_pet
    });

    useEffect(() => {
        setPetData({
            name_pet: pet.name_pet,
            color_pet: pet.color_pet,
            raza_pet: pet.raza_pet,
            weight_pet: pet.weight_pet,
            datBith_pet: pet.datBith_pet,
            age_pet: pet.age_pet
        })
    }, [pet])

    const updatePet = () => {
    console.log(petData);

        let petUpdate = petData
        if (
            !petUpdate.name_pet ||
            !petUpdate.raza_pet ||
            !petUpdate.color_pet ||
            !petUpdate.age_pet ||
            !petUpdate.weight_pet ||
            !petUpdate.datBith_pet
        ) {
            notification["error"]({
                message:
                    "Todos los campos son obligatorios."
            });
        } else {
            editPetDB(petUpdate, pet._id)
                .then(result => {
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadPets(true);
                })
        }
    }

    return (
        <div className="edit-user-form">
            <EditForm
                petData={petData}
                setPetData={setPetData}
                updatePet={updatePet}
            />
        </div>
    )

}

function EditForm(props) {
    const { petData, setPetData, updatePet } = props;
    const [form] = Form.useForm()
    return (
        <Form onFinish={updatePet} form={form}>
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
                >
                    Editar Mascota
                </Button>
            </Form.Item>
        </Form>
    )
}