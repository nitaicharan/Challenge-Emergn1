import styled from "styled-components";
import {
  addDays,
  addWeeks,
  startOfWeek,
  subWeeks,
  isSameWeek,
  isToday,
  format,
} from "date-fns";
import { memo, useMemo, useState } from "react";
import { DayComponent } from "./Day";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1em 2em;
  background-color: transparent;
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    padding: 0.5em 1em;
  }
`;

const WeekContainer = styled.div`
  display: grid;
  gap: 5px;
  margin: 1rem 0;
  grid-template-columns: repeat(7, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: center;
  flex-wrap: wrap;
`;

enum WeeksChange {
  increase,
  current,
  decrease,
}

type Props = {
  date: Date;
};

export const WeekNavigator = memo(({ date = new Date() }: Props) => {
  const getStartOfWeekDate = useMemo(() => {
    console.log("Executing getStartOfWeekDate...");

    return startOfWeek(date, { weekStartsOn: 0 });
  }, [date.getDate()]);

  const [firstWeekDay, setFirstWeekDay] = useState(getStartOfWeekDate);

  const getDaysOfWeek = useMemo(() => {
    console.log("Executing getDaysOfWeek...");

    return Array.from({ length: 7 }, (_, index) =>
      addDays(firstWeekDay, index),
    );
  }, [firstWeekDay.getDate()]);

  const onChangeWeek = (value: WeeksChange) => {
    if (value === WeeksChange.current) {
      return setFirstWeekDay(startOfWeek(date, { weekStartsOn: 0 }));
    }

    const action = value === WeeksChange.increase ? addWeeks : subWeeks;
    setFirstWeekDay((day) => action(day, 1));
  };

  const isCurrentWeek = useMemo(
    () => isSameWeek(firstWeekDay, date, { weekStartsOn: 0 }),
    [firstWeekDay.getDate(), date.getDate()],
  );

  return (
    <Container>
      <WeekContainer>
        {getDaysOfWeek.map((day, index) => (
          <DayComponent
            key={index}
            isCurrentDay={isToday(day)}
            date={format(day, "eeee MMMM dd yyyy")}
          />
        ))}
      </WeekContainer>
      <ButtonContainer>
        <Button onClick={() => onChangeWeek(WeeksChange.decrease)}>
          Previous Week
        </Button>
        <Button
          onClick={() => onChangeWeek(WeeksChange.current)}
          disabled={isCurrentWeek}
        >
          Current week
        </Button>
        <Button onClick={() => onChangeWeek(WeeksChange.increase)}>
          Next Week
        </Button>
      </ButtonContainer>
    </Container>
  );
});
