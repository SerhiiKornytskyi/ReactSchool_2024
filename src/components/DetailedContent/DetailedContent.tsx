import { ChangeEvent, useState, useEffect } from "react";
import { SearchResult } from "../Wrapper";
import { StyledDetailedContent } from "..";

interface Props {
  result: SearchResult;
  onClose: () => {};
}

export const DetailedContent = ({ result, onClose }: Props) => {
  return (
    <StyledDetailedContent>
      <h1>Detailed</h1>
    </StyledDetailedContent>
  );
};
