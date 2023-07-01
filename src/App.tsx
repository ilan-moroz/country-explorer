import Box from "@mui/material/Box";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Country } from "./types/Country";
import { getCountryData } from "./api/CountryAPI";
import CountryForm from "./Components/CountryForm";
import CountryCard from "./Components/CountryCard";

function App() {
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  // State for loading
  const [loading, setLoading] = useState<boolean>(false);

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  // onSubmit function
  const onSubmit = (country: string, resetForm: () => void) => {
    setLoading(true);
    getCountryData(country)
      .then((response) => {
        setCountriesData(response);
        setErrorMessage(""); // Clear the error when request is successful
        resetForm();
      })
      .catch((err: any) => {
        // if country is not found show snackbar error message else set api error
        if (err.response && err.response.status === 404) {
          setErrorMessage("Country not found! Please try again.");
        } else {
          setErrorMessage("An error occurred while fetching the country data.");
        }
        setCountriesData([]); //clear the countries displayed on error
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <CountryForm onCountrySubmit={onSubmit} />
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {countriesData.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </Box>
      )}
    </div>
  );
}

export default App;
