/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, DatePicker, Tag, Modal, Spin } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { breakupTableWrapper, headerClass, headerWrapper, tableSearchClass, responsiveCol, tableFilters, addData } from '@/styles/main-styles';
import { useRouter } from 'next/router';
import { generateID } from '@/utils/generateId';

const columns = [
  {
    title: "Users List",
    responsive: ['xs'],
    render: (rowData) => {
      return <div>
        <div>
          <span css={responsiveCol}>Name:</span>{rowData.first_name + " " + rowData.last_name}
        </div>
        <div>
        <span css={responsiveCol}>Email:</span>{rowData.email}
        </div>
        <div>
        <span css={responsiveCol}>Address:</span>{rowData.address}
        </div>
      </div>
    }
  },
  {
    title: 'Name',
    key: 'title',
    responsive: ['sm'],
    render: (row) => {
      return (
        <div>{row.first_name + " " + row.last_name}</div>
      )
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    responsive: ['sm'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    responsive: ['sm'],
  },
];

function UsersTable({ isHomePage }) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [required, setRequired] = useState(false);

  async function fetchUsersData() {
    // try {
    //   const response = await fetch("https://my.api.mockaroo.com/users.json?key=e9a06770");
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   setData(data)
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   return null;
    // }
    setLoading(true);
    let gData = require('./usersData.json');
    let userdata = isHomePage ? gData.slice(0, 5) : gData
    setData(userdata);
    setLoading(false);
  }

  function filterGamesData() {
    setLoading(true)
    let filtered = data;

    if (searchKeyword) {
      filtered = filtered.filter((item) =>
        (item.first_name + " " + item.last_name).toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // if (dateRange?.length > 1) {
    //   const momentFunc = moment;
    //   filtered = filtered.filter((item) =>
    //     moment(item.create_date, 'YYYY/MM/DD').isBetween(dateRange[0], dateRange[1])
    //   );
    // }

    setFilteredData(filtered)
    setLoading(false);
  }

  useEffect(() => {
    fetchUsersData()
  }, [])

  useEffect(() => {
    filterGamesData()
  }, [data, searchKeyword])

  const handleOk = () => {
    if (fName, lName, email, address) {
      let curData = [...data];
      curData.push({
        id: Number(generateID()),
        first_name: fName,
        last_name: lName,
        email: email,
        address: address
      })
      setData(curData);
      setAddUser(false)
      setFName("");
      setLName("");
      setEmail("");
      setAddress("");
      setRequired(false);
      return;
    }
    return setRequired(true)
  }

  const handleCancel = () => {
    setAddUser(false)
    setFName("");
    setLName("");
    setEmail("");
    setAddress("");
    setRequired(false);
  }

  return (
    <div>
      <div css={headerWrapper}>
        <div css={headerClass}>Users Data</div>
        {!isHomePage && <div css={tableFilters}>
          <Button css={addData} onClick={() => setAddUser(true)}>+ Add User</Button>
          <Input
            css={tableSearchClass}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>}
        {isHomePage && <Tag color='#1677FF' style={{ cursor: "pointer" }} onClick={() => {
          router.push({
            pathname: "/users",
            query: router.query,
          });
        }}>View All</Tag>}
      </div>
      {!loading ? <Table
        // loading={loading}
        css={breakupTableWrapper}
        columns={columns}
        dataSource={filteredData}
        pagination={isHomePage ? false : { pageSize: 8 }}
        scroll={{x: true}}
      /> : <Spin size="large" />}
      <Modal title="Add User" open={addUser} onOk={handleOk} onCancel={handleCancel}>
        <p>First Name: <Input onChange={(e) => setFName(e.target.value)} value={fName} /></p>
        <p>Last Name: <Input onChange={(e) => setLName(e.target.value)} value={lName} /></p>
        <p>Email: <Input onChange={(e) => setEmail(e.target.value)} value={email} /></p>
        <p>Address: <Input onChange={(e) => setAddress(e.target.value)}value={address}/></p>
        {required && <p style={{color: "red", margin: "10px"}}>**Please add all data</p>}
      </Modal>
    </div>
  );
}

export default UsersTable;
