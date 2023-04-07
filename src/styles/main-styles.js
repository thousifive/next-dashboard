import { css } from "@emotion/react";

export const mainDiv = css({
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: 20
})

export const userName = css({
  display: "flex",
  alignItems: "center",
  margin: "20px",
  color: "white",
  gap: "10px"
})

export const sideBarMenuClass = css({
  position: "relative",
  marginTop: "15px",
  "& .ant-menu-item": {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    // color: "#3F3F41",
    margin: "2px 0",
    "& .ant-menu-item-icon": {
      fontSize: "18px",
    },
  },
  "& .ant-menu-item-selected": {
    // color: "#1B31F8",
    // background: "#FFFFFF",
    "&::before": {
      content: "' '",
      display: "block",
      height: "20px",
      width: "4px",
      position: "absolute",
      left: "0",
      // background: "#2461EF",
      borderRadius: "0px 10px 10px 0px",
    },
  },
});

export const headerWrapper = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: "20px"
});

export const headerClass = css({
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
  color: "#3F3F41",
});

export const tableSearchClass = css({
  marginLeft: "10px",
  width: "400px",
  background: "#F4F4F4",
  borderRadius: "12px",
  "& .ant-input-prefix": {
    color: "#AFAFB1",
  },
  "& input.ant-input": {
    background: "inherit",
    padding: "6px",
  },
});

export const breakupTableWrapper = css({
  marginTop: "24px",
  overflowX: "auto",
  overflow: "scroll",
  "& table": {
    border: "1px solid #E8E8E8",
    borderRadius: "12px",
    overflow: "hidden",
    "& tbody.ant-table-tbody tr.ant-table-row:hover": {
      background: "unset",
    },
    "& th.ant-table-cell": {
      fontWeight: 500,
      lineHeight: "20px",
      color: "#76787A",
    },
    "& td.ant-table-cell": {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#212427",
    },
    "& .ant-table-tbody tr.ant-table-row": {
      "& td.ant-table-cell": {
        borderRadius: 0,
      },
      "&.row-color":{
        background: "#F9F9F9",
        borderRadius: 0,
        "&:hover": {
          background: "#F9F9F9",
        },
      },
      "&:hover": {
        background: "#3b3bd91c",
        borderRadius: 0,
        "&>td.ant-table-cell": {
          background: "inherit",
        },
      },
    },
  },
});

export const homePageTable = css({
  width: "50%", 
  height: "50%"
})