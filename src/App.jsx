import "./App.css";
import { useState, useEffect, useRef } from "react";
import Services from "./serveces";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import "primeicons/primeicons.css";
import { ArrowDownWideNarrow } from "lucide-react";
import { ArrowUpNarrowWide } from "lucide-react";
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
  const [SortedValue, setSortedValue] = useState("Asscending");
  const [detealState, setdetealState] = useState(false);
  const [object, setobject] = useState({});

  let numbers = [];
  for (let i = 1; i <= uniData.length; i++) {
    numbers.push(i);
  }

  const input = useRef(null);
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

      try {
        const response = await Services.FetchData(country);
        setuniData(response.data.sort((a, b) => a.name.localeCompare(b.name)));
        if (response.status === 200) {
          setLoader(false);
          console.log(loader);
        } else {
          console.log("request is not fullfill");
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    GetData();
    setPage(1);
    setitemsPerPage(10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

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
  const changeForinputField = (e) => {
    setimg(e.target.files[0]);
  };

  const ImgClickHandler = () => {
    input.current.click();
  };
  const pdfDonwnload = () => {
    const doc = jsPDF("landscape");

    doc.autoTable({
      html: ".myTable",
    });
    doc.save("doc.pdf");
  };

  const SortingName = () => {
    const sortedArray = [...uniData];
    sortedArray.sort((a, b) => b.name.localeCompare(a.name));
    setuniData(sortedArray);
    if (SortedValue === "Asscending") {
      const sortedArray = [...uniData];
      sortedArray.sort((a, b) => b.name.localeCompare(a.name));
      setuniData(sortedArray);
      setSortedValue("Descending");
    }
    if (SortedValue === "Descending") {
      const sortedArray = [...uniData];
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
      setuniData(sortedArray);
      setSortedValue("Asscending");
    }
  };

  const handleupClickEvent = (data, index) => {
    setobject(data);
    setdetealState(false);
  };
  const handledownClickEvent = (data, index) => {
    setobject(data);
    setdetealState(true);
  };

  const style = {
    display: "block",
    transition: "all 0.5s",
  };

  return (
    <>
      <div className="midleSection">
        <select
          name=""
          onChange={changeHnadler}
          id=""
          className="numberSelection"
        >
          {option.map((Element, index) => {
            return (
              <>
                <option value={Element} key={index}>
                  {Element}
                </option>
              </>
            );
          })}
        </select>

        <div className="sorting">
          <div className="butns">
            <ArrowDownWideNarrow
              onClick={SortingName}
              className="sortIcon"
              style={
                SortedValue === "Asscending"
                  ? { display: "none" }
                  : { display: "block", color: "green" }
              }
              size="22"
            />
            <ArrowUpNarrowWide
              onClick={SortingName}
              className="sortIcon"
              style={
                SortedValue === "Asscending"
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
          </div>

          <p>Name</p>
        </div>

        <div className="selection">
          <select name="" id="" onChange={changehandlerforcountry}>
            {countries.map((country, index) => {
              return (
                <>
                  <option value={country} key={index}>
                    {country}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div className="downloades">
          <button className="btn" onClick={pdfDonwnload}>
            <i className="fa-solid fa-file-pdf"></i>
          </button>
          <CSVLink data={uniData}>
            <i className="fa-solid fa-file-csv"></i>
          </CSVLink>
        </div>
      </div>

      <div className="container-fluid">
        <table className="myTable">
          <thead>
            <tr>
              <th>Numbers</th>
              <th>Universties</th>
              <th>Promo-code</th>
            </tr>
          </thead>
          <tbody>
            {uniData.slice(startIndex, endIndex).map((data, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="numberTd">
                      <div className="deteal-lists">
                        <i
                          style={
                            detealState === true &&
                            uniData.indexOf(object) === index
                              ? { display: "block", color: "red" }
                              : { display: "none" }
                          }
                          onClick={() => handleupClickEvent(data, index)}
                          className="pi pi-chevron-up"
                        ></i>
                        <i
                          style={
                            detealState === true &&
                            uniData.indexOf(object) === index
                              ? { display: "none" }
                              : { display: "block" }
                          }
                          onClick={() => handledownClickEvent(data, index)}
                          className="pi pi-chevron-down"
                        />

                        {/* </ArrowDownWideNarrow> */}
                      </div>

                      {numbers[uniData.indexOf(data)]}
                    </td>
                    <td>
                      <div className="nameWithDeteal">{data.name}</div>
                    </td>

                    {/* <td>{data.country}</td> */}
                    <td>{data.alpha_two_code}</td>
                  </tr>

                  {uniData.indexOf(object) === index ? (
                    <>
                      <tr
                        style={
                          detealState === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        className="detealTR"
                      >
                        <td></td>

                        <td className="td">{data.country}</td>
                      </tr>

                      <tr
                        style={
                          detealState === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        className="detealTR"
                      >
                        {/* <td></td> */}
                        <td></td>

                        <td className="td">
                          <a href={data.web_pages}>{data.web_pages}</a>
                        </td>
                      </tr>
                      <tr
                        style={
                          detealState === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        className="detealTR"
                      >
                        <td></td>

                        <td className="td">{data.domains}</td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={loader === true ? "loaderTrue" : "loaderFalse"}>
        <div className="box">
          <h1>loading...</h1>
        </div>
      </div>

      {uniData.length > 10 ? (
        <>
          {" "}
          <div className="pagination">
            <ResponsivePagination
              current={page}
              onPageChange={changeHnadlerForPage}
              pageSize={10}
              total={uniDataSlicedLength}
              className="ul"
              activeItemClassName="activeItemClassName"
              pageItemClassName="pageItemClassName"
              pageLinkClassName="pageLinkClassName"
              navClassName="navClassName"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
