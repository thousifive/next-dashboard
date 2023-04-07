/** @jsxImportSource @emotion/react */
import '@/styles/globals.css'
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Tag, theme } from 'antd';
import { userName, sideBarMenuClass, height100 } from '@/styles/main-styles';
import {MdGames, MdOutlineHome} from 'react-icons/md';
import {FiUsers} from 'react-icons/fi'
import { Loader } from 'next/dynamic';

const { Header, Content, Footer, Sider } = Layout;

const sideBarItems = [
  {
    key: "1",
    icon: <MdOutlineHome />,
    label: "Home",
    href: "/",
  },
  {
    key: "2",
    icon: <MdGames />,
    label: "Games Data",
    href: "/games",
  },
  {
    key: "3",
    icon: <FiUsers />,
    label: "User Data",
    href: "/users",
  }
];

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  if (router?.isFallback) {
    return <Loader />;
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const defaultSelected = () => {
    const path = router.pathname;
    const ele = sideBarItems.find(
      (ele) =>
        ele.href === path);
    return [(ele ? ele : sideMenuItem[0]).key];
  };

  return (
    <Layout style={{height: "100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div css={userName}>
          <UserOutlined />
          <p>John Doe</p>
          <Tag color="#f50">Admin</Tag>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          css={sideBarMenuClass}
          defaultSelectedKeys={["1"]}
          selectedKeys={defaultSelected}
          items={sideBarItems}
          onClick={({ key }) => {
            const item = sideBarItems.find((ele) => ele.key === key);
            if (item) {
              router.push({
                pathname: item.href,
                query: router.query,
              });
            }
          }}
        />
      </Sider>
      <Layout style={{height: "100vh"}}>
        <Header style={{ padding: 0, background: "#001628", textAlign: 'center' }}>
          <h1 style={{fontSize: "24px", color: "beige"}}>Dashboard</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', height: "100%" }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, height: "100%" }}>
          <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', position: "sticky" }}>©2023 Created by <a target='_blank' href='https://github.com/thousifive' style={{color: "#1677FF"}}>thousifive</a></Footer>
      </Layout>
    </Layout>
  );
};

export default App;

