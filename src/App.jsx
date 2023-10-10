import "./App.css";

import { useState, useEffect } from "react";
// import Pagination from "react-js-pagination";
import Services from "./serveces";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function App() {
  const [country, setCountry] = useState("Afghanistan");
  const [uniData, setuniData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [uniDataSlicedLength, setlengthUniData] = useState(uniData.length);
  const [loader, setLoader] = useState(true);
  const changeHnadlerForPage = (e) => {
    setPage(e);
  };
  const changeHnadler = (e) => {
    console.log(e.target.value);
    setitemsPerPage(Number(e.target.value));
  };

  const changehandlerforcountry = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    const GetData = async () => {
      setLoader(true);
      // const MyComponent = Services();
      try {
        const response = await Services.FetchData(country);
        console.log(response);
        setuniData(response.data);
        if (response.status === 200) {
          setLoader(false);
          console.log(loader);
        } else {
          console.log("request is not fullfill");
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
    setPage(1);
    setitemsPerPage(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  let numbers = [];
  for (let i = 1; i <= uniData.length; i++) {
    numbers.push(i);
  }
  // const currentPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let option = [];
  let initialValue = 10;
  const sliceData = uniData.length / 10;
  for (let i = 0; i < sliceData; i++) {
    option.push(initialValue);
    initialValue += 10;
  }
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    setlengthUniData(Math.ceil(uniData.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniData, itemsPerPage, page]);
  console.log(uniDataSlicedLength);
  return (
    <>
      <div className="selection">
        <h4>Select The Country</h4>
        <select name="" id="" onChange={changehandlerforcountry}>
          {countries.map((country) => {
            return (
              <>
                <option value={country} key={country}>
                  {country}
                </option>
              </>
            );
          })}
        </select>
      </div>

      <select name="" onChange={changeHnadler} id="" className="numberSelection">
        {option.map((Element) => {
          return (
            <>
              <option value={Element}>{Element}</option>
            </>
          );
        })}
      </select>
      <div className="container-fluid">
        <table>
          <thead>
            <tr>
              <th>Numbers</th>
              <th>Universties</th>
              <th>Links</th>
              <th>Country</th>
              <th>Country-code</th>
            </tr>
          </thead>
          <tbody>
            {uniData.slice(startIndex, endIndex).map((data) => {
              return (
                <>
                  <tr key={Math.random()}>
                    <td>{numbers[uniData.indexOf(data)]}</td>
                    <td>{data.name}</td>
                    <td>
                      <a href={data.web_pages}>{data.web_pages}</a>
                    </td>
                    <td>{data.country}</td>
                    <td>{data.alpha_two_code}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <ResponsivePagination
          current={page}
          onPageChange={changeHnadlerForPage}
          pageSize={10}
          total={uniDataSlicedLength}
          className="ul"
          activeItemClassName='activeItemClassName'
          pageItemClassName='pageItemClassName'
          pageLinkClassName='pageLinkClassName'
          navClassName='navClassName'
        />
      </div>

      <div className={loader === true ? "loaderTrue" : "loaderFalse"}>
        <div className="box">
          <h1>loading...</h1>
        </div>
      </div>

      {/* <Services/> */}
    </>
  );
}

export default App;
