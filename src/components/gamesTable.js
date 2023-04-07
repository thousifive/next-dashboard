/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react'
import { Table, Button, Input, DatePicker, Tag, Modal, Spin, Space } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { addData, breakupTableWrapper, dateResponsive, headerClass, headerWrapper, responsiveCol, tableFilters, tableSearchClass } from '@/styles/main-styles';
import { useRouter } from 'next/router';
import { generateID } from '@/utils/generateId';
import { format, isWithinInterval } from 'date-fns'

const { RangePicker } = DatePicker;

const columns = [
  {
    title: "Games List",
    responsive: ['xs'],
    render: (rowData) => {
      return <div>
        <div>
          <span css={responsiveCol}>Name:</span>{rowData.title}
        </div>
        <div>
        <span css={responsiveCol}>Category:</span>{rowData.genre}
        </div>
        <div>
        <span css={responsiveCol}>Release Date:</span>{rowData.release_date}
        </div>
      </div>
    }
  },
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    responsive: ['sm'],
  },
  {
    title: 'Category',
    dataIndex: 'genre',
    key: 'genre',
    responsive: ['sm'],
  },
  {
    title: 'Release Date',
    dataIndex: 'release_date',
    key: 'release_date',
    responsive: ['sm'],
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
    setLoading(true);
    let gData = require("./gamesData.json");
    let gameData = isHomePage ? gData.slice(0, 5) : gData;
    setData(gameData);
    setLoading(false);
  }

  function filterGamesData() {
    setLoading(true);
    let filtered = data;

    if (searchKeyword) {
      filtered = filtered.filter((item) =>
        (item?.title + " " + item?.genre)?.toLowerCase?.()?.includes(searchKeyword.toLowerCase())
      );
    }

    if (dateRange?.length > 1) {
      filtered = filtered.filter((item) =>
      isWithinInterval(new Date(item.release_date), {start:new Date(dateRange[0]), end:new Date(dateRange[1])})
      );
    }

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
        id: Number(generateID()),
        title: gameName,
        genre: category,
        release_date: releaseDate
      })
      setData(curData);
      setAddGame(false)
      setGameName("");
      setCategory("");
      setReleaseDate(null);
      setRequired(false);
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
        {!isHomePage && <div css={tableFilters}>
          <Button css={addData} onClick={() => setAddGame(true)}>+ Add Game</Button>
          <RangePicker css={dateResponsive} format={"YYYY-MM-DD"} onChange={(val) => setDateRange(val)} />
          <Input
            css={tableSearchClass}
            placeholder="Search by name & category..."
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
      {!loading ? <Table
        // loading={loading}
        css={breakupTableWrapper}
        columns={columns}
        dataSource={filteredData}
        pagination={isHomePage ? false : { pageSize: 8 }}
        scroll
      /> : <Spin size="large" />}
      <Modal title="Add Game" open={addGame} onOk={handleOk} onCancel={handleCancel}>
        <p>Game Name: <Input onChange={(e) => setGameName(e.target.value)} value={gameName} /></p>
        <p>Category: <Input onChange={(e) => setCategory(e.target.value)} value={category} /></p>
        <p>Release Date: <Input type='date' onChange={(e) => setReleaseDate(e.target.value)}value={releaseDate}/></p>
        {required && <p style={{color: "red", margin: "10px"}}>**Please add all data</p>}
      </Modal>
    </div>
  );
}

export default GamesTable;
