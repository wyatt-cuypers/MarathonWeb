import { Card, CardContent, CardHeader, Tabs } from "@mui/material";
import { SyntheticEvent, useState, memo } from 'react';
import { StyledTab } from "./StyledTab";

interface CustomTimeCardProps {
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isMobile: boolean;
}

const CustomTimeCard: React.FC<CustomTimeCardProps> = ({
  totalHours,
  totalMinutes,
  totalSeconds,
}) => {
  const [timeTabsValue, setTimeTabsValue] = useState(0);
  return (
    <div className="cardStyle">
      <Card className="outerCard">
        <CardHeader
          titleTypographyProps={{
            fontFamily: "Source Code Pro",
            fontSize: 24,
            fontWeight: "bold",
          }}
          style={{ padding: 0 }}
          className="cardHead"
          title={
            <Tabs
              variant="fullWidth"
              value={timeTabsValue}
              onChange={(event: SyntheticEvent, newValue: number) => {
                setTimeTabsValue(newValue);
              }}
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <StyledTab label="Hour" />
              <StyledTab label="Minute" />
              <StyledTab label="Second" />
            </Tabs>
          }
        />
        <CardContent className="cardBody">
          {timeTabsValue === 0 && <div>{totalHours.toFixed(2)} Hours</div>}
          {timeTabsValue === 1 && <div>{totalMinutes.toFixed(2)} Minutes</div>}
          {timeTabsValue === 2 && <div>{totalSeconds} Seconds</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(CustomTimeCard);
