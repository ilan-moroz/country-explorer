import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Country } from "../types/Country";

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <Card key={country.name.common} sx={{ width: 300, margin: 2 }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export default CountryCard;
