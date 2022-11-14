import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Button } from "antd";
import MenuTop from "../components/AdminComponents/MenuTop";
import MenuSider from "../components/AdminComponents/MenuSider";
import { GithubOutlined } from "@ant-design/icons";
import SignIn from "../pages/Admin/SignIn";
import useAuth from "../hooks/useAuth";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { children } = props;
  const { user, isLoading } = useAuth();
  /* Si no hay usuario y ya termino de cargar la página, no es un usuario logueado */
  if (!user && !isLoading) {
    return (
      <>
        <SignIn />
        <Routes>
          <Route path="/admin/login" element={<SignIn />} />
        </Routes>
      </>
    );
  }

  /* Si user tiene el contenido del payload y ya termino de cargar la página */
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">{children}</Content>
          <Footer className="layout-admin__footer">
            <Button type="link" onClick={() => console.log("Github")}>
              <GithubOutlined style={{ fontSize: "17px" }} /> Universidad
              Electiva 1 Andres Romero
            </Button>
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}
