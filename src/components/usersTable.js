/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react'
import { Table, Button, Input, DatePicker, Tag } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { breakupTableWrapper, headerClass, headerWrapper, tableSearchClass } from '@/styles/main-styles';
import { useRouter } from 'next/router';

const { Search } = Input;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Name',
    key: 'title',
    render: (row) => {
      return (
        <div>{row.first_name+" "+row.last_name}</div>
      )
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

function UsersTable({isHomePage}) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
    let gData = require('./usersData.json');
    let userdata = isHomePage ? gData.slice(0, 5) : gData
    setData(userdata);
  }

  function filterGamesData() {
    let filtered = data;
  
    if (searchKeyword) {
      filtered = filtered.filter((item) =>
        (item.first_name+" "+item.last_name).toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
  
    // if (dateRange?.length > 1) {
    //   const momentFunc = moment;
    //   filtered = filtered.filter((item) =>
    //     moment(item.create_date, 'YYYY/MM/DD').isBetween(dateRange[0], dateRange[1])
    //   );
    // }
  
    setFilteredData(filtered)
  }

  useEffect(() => {
    fetchUsersData()
  }, [])

  useEffect(() => {
    filterGamesData()
  },[data, searchKeyword])

  return (
    <div>
      <div css={headerWrapper}>
        <div css={headerClass}>Users Data</div>
        {!isHomePage && <Input
          css={tableSearchClass}
          placeholder="Search by name..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />}
        {isHomePage && <Tag color='#1677FF' style={{cursor: "pointer"}} onClick={()=>{
          router.push({
            pathname: "/users",
            query: router.query,
          });
        }}>View All</Tag>}
      </div>
      <Table
        loading={loading}
        css={breakupTableWrapper}
        columns={columns}
        dataSource={filteredData}
        pagination={isHomePage ? false : {pageSize: 8}}
      />
    </div>
  );
}

export default UsersTable;
