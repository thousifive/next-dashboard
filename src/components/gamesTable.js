/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, DatePicker, Tag, Modal } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { breakupTableWrapper, headerClass, headerWrapper, tableSearchClass } from '@/styles/main-styles';
import { useRouter } from 'next/router';

const columns = [
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'genre',
    key: 'genre',
  },
  {
    title: 'Release Date',
    dataIndex: 'release_date',
    key: 'release_date',
  },
];

function GamesTable({ isHomePage }) {

  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addGame, setAddGame] = useState(false);
  const [gameName, setGameName] = useState("");
  const [category, setCategory] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [required, setRequired] = useState(false);

  async function fetchGamesData() {
    // setLoading(true);
    // try {
    //   const response = await fetch("https://my.api.mockaroo.com/games.json?key=e9a06770");
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   setData(data)
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   return null;
    // }
    // setLoading(false);
    let gData = require("./gamesData.json");
    let gameData = isHomePage ? gData.slice(0, 5) : gData;
    setData(gameData);
  }

  function filterGamesData() {
    setLoading(true);
    let filtered = data;

    if (searchKeyword) {
      filtered = filtered.filter((item) =>
        item?.title?.toLowerCase().includes(searchKeyword.toLowerCase())
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
    fetchGamesData()
  }, [])

  useEffect(() => {
    filterGamesData()
  }, [data, searchKeyword, dateRange])

  const handleOk = () => {
    if (gameName, category, releaseDate) {
      let curData = [...data];
      curData.push({
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: gameName,
        genre: category,
        release_date: releaseDate
      })
      setData(curData);
      setAddGame(false)
      return;
    }
    return setRequired(true)
  }

  const handleCancel = () => {
    setGameName("");
    setCategory("");
    setReleaseDate(null);
    setAddGame(false);
    setRequired(false);
  }

  return (
    <div>
      <div css={headerWrapper}>
        <div css={headerClass}>Games Data</div>
        {!isHomePage && <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <Button style={{marginRight: "10px"}} onClick={() => setAddGame(true)}>+Add Game</Button>
          <Input
            css={tableSearchClass}
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>}

        {isHomePage && <Tag color='#1677FF' style={{ cursor: "pointer" }} onClick={() => {
          router.push({
            pathname: "/games",
            query: router.query,
          });
        }}>View All</Tag>}
      </div>
      <Table
        loading={loading}
        css={breakupTableWrapper}
        columns={columns}
        dataSource={filteredData}
        pagination={isHomePage ? false : { pageSize: 8 }}
      />
      <Modal title="Add Game" open={addGame} onOk={handleOk} onCancel={handleCancel}>
        <p>Game Name: <Input onChange={(val) => setGameName(val)} /></p>
        <p>Category: <Input onChange={(val) => setCategory(val)} /></p>
        <p>Release Date: <Input type='date' onChange={(val) => setReleaseDate(val)} /></p>
      </Modal>
    </div>
  );
}

export default GamesTable;
