import Box from "@mui/material/Box";
import "./App.css";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

//interface for what data we will use
interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  startOfWeek: string;
}

function App() {
  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // for snackbar error message
  const [open, setOpen] = useState(false);
  const countryNotFound = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // api
  const api = "https://restcountries.com/v3.1/name/";

  const [countriesData, setCountriesData] = useState<Country[]>([]);

  // State for loading
  const [loading, setLoading] = useState<boolean>(false);

  // onSubmit function
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.get(`${api}/${data.country}`).then((response) => {
        setCountriesData(response.data);
      });
    } catch (err) {
      // if country is not found show snackbar error message
      countryNotFound();
      setCountriesData([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
    reset();
  };

  return (
    <div className="App">
      {/* input */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          id="country"
          label="Enter country name"
          autoFocus
          {...register("country", { required: true })}
          error={Boolean(errors.country)}
          helperText={errors.country && "Country is required"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Search
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error">
          Country not found! Please try again
        </Alert>
      </Snackbar>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {countriesData.map((country, index) => (
            <Card key={index} sx={{ width: 300, margin: 2 }}>
              <CardActionArea>
                <Box sx={{ border: "2px solid" }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={country.flags.png}
                    alt={country.name.common}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Capital : </b>
                    {country.capital}
                    <br />
                    <b>Population : </b>
                    {country.population.toLocaleString()}
                    <br />
                    <b>Languages : </b>
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : ""}
                    <br />
                    <b>Start of week : </b>
                    {country.startOfWeek}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}

export default App;
