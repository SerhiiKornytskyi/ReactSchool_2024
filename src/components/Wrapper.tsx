import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";
import { useState, useEffect } from "react";

export function Wrapper() {

  return (
    <>
      <SearchInput />
      <SearchResult />
    </>
  );
}

export default Wrapper;
