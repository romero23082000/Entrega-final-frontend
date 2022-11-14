import React from "react";
import { Layout, Tabs } from "antd";
import { Routes, Route } from "react-router-dom";
import Login from "../../../components/AdminComponents/Login";
import Register from "../../../components/AdminComponents/Register";
import Logo from "../../../assets/img/png/Logo.png";
import "./SigIn.scss";
import { getAccessToken } from "../../../api/auth";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessToken()) {
    return (
      <>
        <Routes>
          <Route path="/admin" />
        </Routes>
      </>
    );
  }
  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Agustin Navarro Galdon" />
        </h1>

        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <Login />
            </TabPane>
            <TabPane tab={<span>Nuevo usuario</span>} key="2">
              <Register />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
