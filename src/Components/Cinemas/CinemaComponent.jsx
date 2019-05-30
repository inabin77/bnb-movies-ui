import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import "./cinema.css";

const styles = {
  card: {
  
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: "cover"
  }
};

class CinemaComponent extends Component {
  render() {
    const {
      classes,
      cinemas,
      loading,
      deleteCinema,
      user: { role }
    } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="cinemaContainer">
        {cinemas.length
          ? cinemas.map((cinema, index) => (
              <div
                key={index}
                className="p-3"
                style={{
                  width:"33%",
                  float:"left",
                }}
              >
                <Card className="mainCard">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={cinema.name}
                      className={classes.media}
                      height="140"
                      image={cinema.poster_link}
                      title="image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {cinema.name}
                      </Typography>
                      Address:{" "}
                      <Typography component="h3">{cinema.address}</Typography>
                      <br />
                      Phone:{" "}
                      <Typography component="h3">{cinema.phone}</Typography>
                      <br />
                      {/* <Typography component="p">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  {role === 1 && (
                    <CardActions>
                      <Link to={`/edit-cinema/${cinema._id}`}>
                        <Button size="small" color="primary" variant="contained" type="button" >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained" type="button" 
                        onClick={() => {
                          deleteCinema(cinema._id);
                        }}
                      >
                        DELETE CINEMA
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default withStyles(styles)(CinemaComponent);
