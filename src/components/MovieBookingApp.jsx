import { useState } from "react";

let SCREENS = [
  {
    id: 1,
    time: "10:00 AM",
    seats: [1, 0, 1, 1, 1, 0, 1, 1, 0],
  },
  {
    id: 2,
    time: "02:30 PM",
    seats: [1, 1, 1, 0, 1, 1, 1, 0, 0],
  },
  {
    id: 3,
    time: "06:45 PM",
    seats: [1, 1, 1, 1, 1, 0, 1, 1, 0],
  },
];

const MOVIES = [
  {
    id: 1,
    title: "Jigarthandaw xx",
    img: "https://assets.mspimages.in/gear/wp-content/uploads/2022/12/Jigarthanda-double-x.jpg",
  },
  {
    id: 2,
    title: "Japan",
    img: "https://assets.gadgets360cdn.com/pricee/assets/product/202302/Japan_1676620449.jpg",
  },
  {
    id: 3,
    title: "Leo",
    img: "https://static.moviecrow.com/gallery/20230917/221018-Leo%20Vijay%20Telugu%20Poster.jpg",
  },
];
function MovieBookingApp() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [selectedSeat, setSelectedSeats] = useState([]);

  const handleSeatSelect = (index, screen) => {
    if (screen?.id !== selectedScreen?.id) {
      setSelectedSeats([index]);
      setSelectedScreen(screen);
    } else {
      // If the screen is the same, toggle the seat selection.
      if (selectedSeat.includes(index)) {
        setSelectedSeats(selectedSeat.filter((i) => i !== index));
      } else {
        setSelectedSeats((seats) => [...seats, index]);
      }
    }
    console.log(selectedMovie);
    console.log(selectedScreen);
    console.log(index);
  };

  const handleBooking = () => {
    alert(
      `Seats ${selectedSeat.map((index) => index + 1).join(",")} booked for ${
        selectedScreen.movie.title
      } at ${selectedScreen.time}`
    );
    SCREENS = SCREENS.map((screen) => {
      if (screen.id === selectedScreen?.id) {
        let seats = screen.seats;
        selectedSeat.map((seat) => (seats[seat] = 0));
        return {
          ...screen,
          seats,
        };
      }
      return screen;
    });
    setSelectedMovie(null);
    setSelectedScreen(null);
    setSelectedSeats([]);
  };
  return (
    <div>
      <h1>Movie Booking App</h1>
      <h2>Choose your Movie</h2>
      <div className="movie-selection">
        {MOVIES.map((movie) => (
          <div
            className="movie"
            key={movie.id}
            onClick={() => {
              setSelectedMovie(movie);
            }}
          >
            <img
              className="movie-poster img-fluid"
              src={movie.img}
              alt={movie.title}
            />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <>
          <h2>Choose your screen</h2>
          <div className="screen-selection">
            {SCREENS.map((screen) => (
              <div
                className={`screen ${
                  screen.id === selectedScreen?.id ? "selected" : ""
                } ${screen.seats.includes(1) ? "available" : ""}`}
                key={screen.id}
              >
                <div className="screen-number">Screen {screen.id}</div>
                <div className="screen-time">{screen.time}</div>
                <div className="movie-title">{selectedMovie.title}</div>
                <div className="screen-seats">
                  {screen.seats.map((seat, index) => (
                    <div
                      key={index}
                      className={`seat ${seat ? "available" : "unavailable"} 
                     
                      ${
                        selectedSeat.includes(index) &&
                        selectedScreen?.id === screen.id
                          ? "selected"
                          : ""
                      }
                      ${selectedSeat.includes(index) ? "booked" : ""}`}
                      onClick={() => {
                        if (seat) {
                          handleSeatSelect(index, {
                            ...screen,
                            movie: selectedMovie,
                          });
                        }
                      }}
                    >
                      <div className="seat-number">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="booking-summary">
        <div className="payBill">
          <div className="selected-screen">
            {selectedScreen && (
              <div>
                <h3>Selected Screen:{selectedScreen.id}</h3>
                <p>Time:{selectedScreen.time}</p>
                <p>Movie:{selectedScreen.movie.title}</p>
              </div>
            )}
          </div>
          <div className="selected-seat">
            {selectedScreen && selectedSeat?.length > 0 && (
              <div>
                <h3>
                  Selected Seats:
                  <>{selectedSeat.map((index) => index + 1).join(",")}</>
                </h3>
                <h3>No of Seats:{selectedSeat?.length}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="payment-button"
        disabled={!selectedScreen || selectedSeat.length === 0}
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
}

export default MovieBookingApp;
