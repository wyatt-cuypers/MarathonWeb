import "../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Tabs, useMediaQuery } from "@mui/material";
import CustomCard from "../Components/CustomCard";
import CustomTimeCard from "../Components/CustomTimeCard";
import useRunData, { getRunningTime } from "../Hooks/useRunData";
import CustomChart from "../Components/CustomChart";
import CustomLoading from "../Components/CustomLoading";
import CustomError from "../Components/CustomError";
import CustomCountdown from "../Components/CustomCountdown";
import { SyntheticEvent, memo, useState, useMemo } from "react";
import { StyledTab } from "../Components/StyledTab";

export interface runDataType {
  id: number;
  runNumber: number;
  averageHR: number;
  distance: string;
  calories: number;
  averagePace: string;
  duration: string;
  created_at: string;
  updated_at: string;
}

const RunningStats = () => {
  const isMobile = useMediaQuery("(max-width: 991px)");
  const [runsTabsValue, setRunsTabsValue] = useState(0);
  const { logout } = useAuth0();
  const {
    distance,
    numberOfRuns,
    totalSeconds,
    totalMinutes,
    totalHours,
    calories,
    averageHR,
    averagePace,
    lastRun,
    error,
    loading,
  } = useRunData();
  const values = useMemo(
    () => ({
      distance: runsTabsValue === 0 ? distance : Number(lastRun?.distance),
      numberOfRuns: runsTabsValue === 0 ? numberOfRuns : 1,
      totalSeconds:
        runsTabsValue === 0
          ? totalSeconds
          : getRunningTime([lastRun as runDataType]),
      totalMinutes:
        runsTabsValue === 0
          ? totalMinutes
          : getRunningTime([lastRun as runDataType]) / 60,
      totalHours:
        runsTabsValue === 0
          ? totalHours
          : getRunningTime([lastRun as runDataType]) / 60 / 60,
      averageHR: runsTabsValue === 0 ? averageHR : lastRun?.averageHR,
      calories: runsTabsValue === 0 ? calories : lastRun?.calories,
      averagePace: runsTabsValue === 0 ? averagePace : `Pace: ${lastRun?.averagePace.split(":")[1]}:${lastRun?.averagePace.split(":")[2]}`,
    }),
    [
      averageHR,
      averagePace,
      calories,
      distance,
      lastRun,
      numberOfRuns,
      runsTabsValue,
      totalHours,
      totalMinutes,
      totalSeconds,
    ]
  );
  if (loading) return <CustomLoading />;
  if (error) return <CustomError error={error} />;
  return (
    <div>
      <div className="header">
        <div>
          Wyatt's Marathon Training Stats
          <Tabs
            variant="fullWidth"
            value={runsTabsValue}
            onChange={(event: SyntheticEvent, newValue: number) => {
              setRunsTabsValue(newValue);
            }}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
            }}
          >
            <StyledTab label="All Runs" />
            <StyledTab label="Last Run" />
          </Tabs>
        </div>
        <Button
          style={{
            position: "absolute",
            right: 20,
            fontSize: 16,
            color: "#282c34",
            fontFamily: "Source Code Pro",
            fontWeight: "bold",
          }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
      <CustomCountdown targetDate={"2024-06-01T00:00:00"} />
      <div style={{ display: !isMobile ? "flex" : "", alignItems: "center" }}>
        <CustomChart distance={values.distance} />
        <div style={{ flex: 1 }}>
          <div
            className="cardContainer"
            style={{ display: !isMobile ? "flex" : "" }}
          >
            <CustomCard title="Runs">{values.numberOfRuns}</CustomCard>
            <CustomCard title="Heart Rate">{values.averageHR} BPM</CustomCard>
          </div>
          <div
            className="cardContainer"
            style={{ display: !isMobile ? "flex" : "" }}
          >
            <CustomCard title="Total Distance">
              {values.distance} Miles
            </CustomCard>
            <CustomCard title="Calories Burned">
              {values.calories} Calories
            </CustomCard>
          </div>
          <div
            className="cardContainer"
            style={{ display: !isMobile ? "flex" : "" }}
          >
            <CustomCard title="Average Pace">{values.averagePace}</CustomCard>
            <CustomTimeCard
              totalHours={values.totalHours}
              totalMinutes={values.totalMinutes}
              totalSeconds={values.totalSeconds}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RunningStats);
