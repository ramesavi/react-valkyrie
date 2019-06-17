import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Moment from "moment";
import { extendMoment } from "moment-range";
import DateRange from "./DateRange";

const moment = extendMoment(Moment);

export default props => {
  const { group } = props;
  const format = "YYYY-MM-DD";

  const [instances, setInstances] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [{ startDate, endDate }, setDates] = useState({
    startDate: moment().subtract(1, "days"),
    endDate: moment().add(1, "days")
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/instance/query", {
        start_date: startDate.format(format),
        end_date: endDate.format(format),
        status: null,
        group_id: group.id
      })
      .then(response => {
        setInstances(response.data);
        setIsLoading(false);
      });
  }, [group.id, startDate, endDate]);

  const doneHandler = (startDate, endDate) => {
    setDates({
      startDate: startDate,
      endDate: endDate
    });
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <DateRange
        startDate={startDate}
        endDate={endDate}
        onChange={doneHandler}
      />

      <MaterialTable
        columns={[
          { title: "Id", field: "id" },
          { title: "StartTime", field: "start_time" },
          { title: "EndTime", field: "end_time" },
          { title: "Status", field: "status" },
          { title: "Agent", field: "agent" }
        ]}
        data={instances}
        title="Instances"
        options={{
          exportButton: true,
          pageSize: 10,
          pageSizeOptions: [5, 10, 25, 50, 100]
        }}
        isLoading={isLoading}
        style={{ marginTop: "25px" }}
      />
    </div>
  );
};
