import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Switch,
  Col,
  notification,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/user.png";
import { uploadAvatar, getAvatar } from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";

import "./EditUser.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState ({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    status: user.status,
    avatar: user.avatar,
  });

  useEffect(() => {
    setUserData({
      name_user: user.name_user,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

 const updateUser = () => {
    const token = getAccessToken();
    console.log(userData);
    
    let userUpdate = userData;

    if (!userUpdate.name_user || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message:
          "Name, lastname and email fields must be filled. El nombre, apellidos e email son obligatorios."
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatar(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUser(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateUser(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  }; 
  useEffect (
    () => {
      console.log (user);
    },
    [user]
  );
 

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;
  const [form] = Form.useForm ()
  return (
    <Form className="form-edit" onFinish={updateUser} form={form}  >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Name/Nombre"
              value={userData.name_user}
              onChange={e => setUserData({ ...userData, name_user: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Lastname/Apellidos"
              value={userData.lastname}
              onChange={e =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>


      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Active">
            <Switch
              checkedChildren="active"
              unCheckedChildren="inactive"
              checked={userData.active}
            />
          </Form.Item>
        </Col>
        </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}