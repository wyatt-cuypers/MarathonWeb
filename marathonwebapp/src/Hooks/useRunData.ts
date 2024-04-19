import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { runDataType } from "../Screens/RunningStats";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuid } from "uuid";
import Pusher from "pusher-js";

const audience = "https://marathon-api/";

const useRunData = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [runData, setRunData] = useState<runDataType[]>([]);
  const [numberOfRuns, setNumberOfRuns] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [calories, setCalories] = useState(0);
  const [averageHR, setAverageHR] = useState(0);
  const [averagePace, setAveragePace] = useState("");
  const [lastRun, setLastRun] = useState<runDataType | null>();
  const [updateId, setUpdateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | AxiosError>(null);

  Pusher.logToConsole = true;

  var pusher = new Pusher("9ac628943ca9938b1a42", {
    cluster: "us3",
  });

  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data: any) {
    alert(JSON.stringify(data));
  });

  useEffect(() => {
    const eventSource = new EventSource(
      "https://reasonably-needed-penguin.ngrok-free.app/runs/stream"
    );
    eventSource.onmessage = console.log;

    eventSource.addEventListener("message", () => {
      setUpdateId(uuid());
    });

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
          },
        });
        await axios
          .get("https://reasonably-needed-penguin.ngrok-free.app/runs", {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": true,
              "Api-Key": "AIzaSyA51Y9VsIVwboJmm741td8MPCLES8j8-OA",
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            try {
              setRunData(response.data);
              console.log(response.data);
              const runData: runDataType[] = response.data;
              // Last Run
              setLastRun(runData?.[runData?.length - 1]);
              // Run Number
              const runNumber = runData?.length;
              setNumberOfRuns(runNumber);
              // Time Spent Running - Convert hours and minutes to seconds first, add them all together to get total seconds, and then get total minutes and total seconds
              const hours =
                runData
                  .map((t) => {
                    return Number(t.duration.split(":")[0]);
                  })
                  .reduce((total, add) => total + add) *
                60 *
                60;
              const minutes =
                runData
                  .map((t) => {
                    return Number(t.duration.split(":")[1]);
                  })
                  .reduce((total, add) => total + add) * 60;
              const seconds = runData
                .map((t) => {
                  return Number(t.duration.split(":")[2]);
                })
                .reduce((total, add) => total + add);
              const allTime = hours + minutes + seconds;
              setTotalSeconds(allTime);
              setTotalMinutes(allTime / 60);
              setTotalHours(allTime / 60 / 60);
              // Distance
              setDistance(
                Math.ceil(
                  runData.reduce((accumulator, curValue) => {
                    return accumulator + Number(curValue.distance);
                  }, 0)
                )
              );
              // Average Heart Rate
              setAverageHR(
                Math.floor(
                  runData.reduce((acc, cur) => {
                    return acc + cur.averageHR;
                  }, 0) / runNumber
                )
              );
              // Calories
              setCalories(
                runData.reduce((acc, cur) => {
                  return acc + cur.calories;
                }, 0)
              );
              // Average Pace - Convert minutes to seconds, add all seconds together, get whole number of minutes, then get the remainder in seconds
              const paceMinutes =
                runData
                  .map((t) => {
                    return Number(t.averagePace.split(":")[1]);
                  })
                  .reduce((total, add) => total + add) * 60;
              const paceSeconds = runData
                .map((t) => {
                  return Number(t.averagePace.split(":")[2]);
                })
                .reduce((total, add) => total + add);
              const averagePaceInSeconds =
                (paceMinutes + paceSeconds) / runNumber;
              const averagePaceMinutes = Math.floor(averagePaceInSeconds / 60);
              const remainingSeconds = Math.floor(averagePaceInSeconds % 60);
              setAveragePace(
                `Pace: ${
                  averagePaceMinutes >= 10
                    ? averagePaceMinutes
                    : `0${averagePaceMinutes}`
                }:${
                  remainingSeconds >= 10
                    ? remainingSeconds
                    : `0${remainingSeconds}`
                }`
              );
            } catch (err) {}
          });
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateId]);

  return {
    runData,
    numberOfRuns,
    distance,
    totalSeconds,
    totalMinutes,
    totalHours,
    calories,
    averageHR,
    averagePace,
    lastRun,
    loading,
    error,
  };
};

export default useRunData;
