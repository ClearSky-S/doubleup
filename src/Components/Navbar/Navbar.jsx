import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { IoIosReorder } from "react-icons/io";
import { getProfile } from "../../api/API_Profile";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState([]);

  const searchEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`/profile?q=${searchText}`);
    }
  };

  const searchData = () => {
    navigate(`/profile?q=${searchText}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getProfile();
        setSearchText(result);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, []);

  return (
    <div className="Navbar">
      <div className="leftSide">
        <Link to="/">
          <svg
            width="40"
            height="40"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-10"
          >
            <path
              d="M11.2698 8.23105C10.7112 7.90194 10.8849 8.13232 11.1233 8.34953C12.1213 9.25788 12.782 10.1498 13.0273 10.9199C13.1873 11.4267 13.0273 11.7328 12.8059 11.2918C12.5217 10.7582 12.1371 10.2805 11.6717 9.8832C11.3822 9.6594 11.389 9.76801 11.5286 9.94573C12.0974 10.6731 12.4346 11.4202 12.094 11.9895C11.532 12.9275 9.30112 12.6905 7.10426 11.4629C4.30455 9.90295 2.57772 7.76701 3.20782 6.67435C3.48371 6.19714 4.22962 6.01613 5.11858 6.07208C5.30931 6.07208 5.29909 6.02929 5.11858 5.98651C4.07294 5.73638 2.82635 5.97005 2.38358 6.72372C1.57636 8.06979 3.45646 10.5809 6.58656 12.3186C7.39948 12.7743 8.25752 13.1502 9.14785 13.4409C9.76774 13.6417 9.67919 13.8819 8.61652 13.6844C7.24076 13.3775 5.92511 12.8586 4.72008 12.1475C4.3352 11.9303 4.28411 12.0158 4.57022 12.2857C4.98562 12.662 5.44248 12.9931 5.93261 13.2731C9.04227 15.0634 12.9183 15.5275 14.032 13.6614C15.0538 11.9895 13.2623 9.40928 11.2698 8.23105Z"
              fill="#F8AF38"
            />
            <path
              d="M1.14282 1.14258L2.82926 4.01407H6.31524V9.66279C7.19617 10.363 8.6598 11.1002 9.65384 11.1642V4.01407H13.1707L14.8571 1.14258H1.14282Z"
              fill="#F8AF38"
            />
          </svg>
        </Link>
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link to="/">
            <span>GGanbuGG</span>
          </Link>
          <Link to="/deck">개인 통계</Link>
          <Link to="/champion">챔피언통계</Link>
          <Link to="/leaderboards">순위표</Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <IoIosReorder />
        </button>
      </div>
      <div className="rightSide">
        <input
          type="text"
          placeholder="소환사 검색"
          onChange={(e) => setSearchText(e.target.value)}
          minLength="2"
          onKeyUp={(event) => searchEnter(event)}
        />
        <button type="submit" onClick={searchData}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
