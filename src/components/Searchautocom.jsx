import React, { useEffect, useState } from "react";
import Suggestion from "./Suggestion";

const Searchautocom = () => {
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState([]);
  const [error, seterror] = useState(null);
  const [searchparams, setsearchparams] = useState("");
  const [showdropdown, setshowdropdown] = useState(false);
  const [filters, setfilters] = useState([]);
  const handlechange = (event) => {
    const query = event.target.value.toLowerCase();
    setsearchparams(query);
    if (query.length > 1) {
      const filtersdata =
        user && user.length
          ? user.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setshowdropdown(true);
      setfilters(filtersdata);
    } else {
      setshowdropdown(false);
    }
  };
  const fetchdata = async () => {
    try {
      setloading(true);
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      if (data && data.users && data.users.length) {
        setuser(data.users.map((useritem) => useritem.firstName));
        setloading(false);
        seterror(null);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      seterror(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(user, filters);
  const handleclick = (event) => {
    console.log(event.target.innerText);
    setshowdropdown(false);
    setsearchparams(event.target.innerText);
    setfilters([]);
  };
  return (
    <>
    <h1>Search Auto Complete</h1>
      <div className="search-autocomplete-container">
        {loading ? (
          <h1>loading please wait</h1>
        ) : (
          <input
            type="text"
            name="search"
            id="search"
            value={searchparams}
            onChange={handlechange}
            placeholder="Search..."
          />
        )}
      </div>
      {showdropdown && <Suggestion handleclick={handleclick} data={filters} />}
    </>
  );
};

export default Searchautocom;
