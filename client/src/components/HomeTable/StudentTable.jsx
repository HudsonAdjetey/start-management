import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import "./table.min.css";
import useDebounce from "../../hook/useDebounce";
import Table from "./Table";
import { toastError } from "../../toastify/toastMes";
import NormalLoader from "../loadingSpinner/NormalLoader";

const URL = `http://localhost:5010/api-bill/student-system/students?schoolID=`;

const StudentTable = () => {
  const [listContent, setListContent] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const schoolID = JSON.parse(sessionStorage.getItem("userinfo"));
  /* FETCH DATA */
  const fetchQuery = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      return await axios.get(URL + schoolID.schoolGen);
    },
  });
  useEffect(() => {
    if (fetchQuery.isSuccess) {
      setListContent(fetchQuery?.data?.data?.data || []);
      console.log(listContent);
    } else if (fetchQuery.isError) {
      toastError("Request not found");
    }
  }, [fetchQuery.isSuccess]);
  /* SAMPLE DATA */
  useEffect(() => {
    if (fetchQuery.isPaused) {
      toastError("Check your internet");
    }
  }, [fetchQuery]);

  const debounceValue = useDebounce(searchQuery);
  const filteredData = listContent?.filter((info) => {
    return (
      info.firstName.toLowerCase().includes(debounceValue.toLowerCase()) ||
      info.lastName.toLowerCase().includes(debounceValue.toLowerCase())
    );
  });

  /* PAGINATION */
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredData?.slice(itemOffset, endOffset);
  let pageCount = filteredData
    ? Math.ceil(filteredData?.length / itemsPerPage)
    : 1;
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setItemOffset(0);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData?.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="table__container  light">
      {fetchQuery.isPaused !== true && fetchQuery.isPending && <NormalLoader />}

      <div className="table__input-search">
        <input
          type="text"
          placeholder="Make a query"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <Table
        first={"First Name"}
        last={"Last Name"}
        nameOfClass={"Class"}
        gender={"Gender"}
        stID={"Student ID"}
        currentItems={currentItems}
      />

      {/* PAGINATION */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Number(pageCount)}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        activeLinkClassName="active"
        nextLinkClassName="page-num"
        previousLinkClassName="page-num"
      />
      {/* PAGINATION */}
    </div>
  );
};

export default StudentTable;
