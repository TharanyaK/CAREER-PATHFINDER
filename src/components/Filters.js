import { message } from "antd";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../pages/apis/jobs";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Filters({ filters, setFilters, setData }) {
  const dispatch = useDispatch();

  const filterData = async (filtersTemp) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllJobs(filtersTemp);
      if (response.success) {
        const approvedJobs = response.data.filter(
          (job) => job.status === "approved"
        );
        setData(approvedJobs);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start gap-2">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="bulgaria">Bulgaria</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Industry</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>

        <select
          name=""
          id=""
          value={filters.expeience}
          onChange={(e) =>
            setFilters({ ...filters, expeience: e.target.value })
          }
        >
          <option value="">Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
          <option value="5">5 Years</option>
          <option value="6">6 Years</option>
        </select>
        <button
          className="primary-outline-btn"
          onClick={() => {
            filterData({
              location: "",
              expeience: "",
              industry: "",
            });
            setFilters({
              location: "",
              expeience: "",
              industry: "",
            });
          }}
        >
          CLEAR
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => filterData(filters)}
        >
          FILTER
        </button>
      </div>
    </div>
  );
}

export default Filters;
