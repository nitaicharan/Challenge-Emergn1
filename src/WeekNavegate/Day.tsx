import { memo } from "react";
import styled from "styled-components";

const ContentStyle = styled.div<{ $isCurrentDay: boolean }>`
  padding: 1em;
  background-color: ${(props) =>
    props.$isCurrentDay ? "#f0f0f0" : "transparent"};
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;

type Props = {
  date: string;
  isCurrentDay: boolean;
};

export const DayComponent = memo((props: Props) => {
  console.log("DayComponent rendering...");

  return (
    <ContentStyle $isCurrentDay={props.isCurrentDay}>{props.date}</ContentStyle>
  );
});
