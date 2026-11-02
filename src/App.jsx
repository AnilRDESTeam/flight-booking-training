import { useState } from 'react';
import { flights, airportLabels } from './data/flights.js';
import './App.css';

function App() {
  // Search state
  const [searchOrigin, setSearchOrigin] = useState('BLR');
  const [searchDestination, setSearchDestination] = useState('DEL');
  const [searchDate, setSearchDate] = useState('2026-11-20');

  // Booking state
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerName, setPassengerName] = useState('Test Traveller');
  const [passengerCount, setPassengerCount] = useState(1);
  const [confirmation, setConfirmation] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Filter flights based on search criteria
  const handleSearch = () => {
    setValidationError('');
    setSelectedFlight(null);
    setConfirmation(null);
  };

  const normalizeCode = (code) => code.trim().toUpperCase();

  const filteredFlights = flights.filter((flight) => {
    const o = normalizeCode(searchOrigin);
    const d = normalizeCode(searchDestination);
    return flight.origin === o && flight.destination === d && flight.date === searchDate;
  });

  // Handle flight selection
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setConfirmation(null);
    setValidationError('');
  };

  // Validate and create booking
  const handleBooking = () => {
    setValidationError('');

    // Validation
    if (!passengerName.trim()) {
      setValidationError('Passenger name cannot be blank.');
      return;
    }

    const count = parseInt(passengerCount, 10);
    if (isNaN(count) || count < 1 || count > 6) {
      setValidationError('Passenger count must be an integer from 1 to 6.');
      return;
    }

    if (!selectedFlight) {
      setValidationError('Please select a flight.');
      return;
    }

    // Generate confirmation
    const refNum = `TRAIN-${Date.now()}`;
    const total = selectedFlight.priceInr * count;
    setConfirmation({
      reference: refNum,
      status: 'SIMULATED',
      airline: selectedFlight.airline,
      origin: selectedFlight.origin,
      destination: selectedFlight.destination,
      date: selectedFlight.date,
      departure: selectedFlight.departure,
      passengerName: passengerName.trim(),
      passengerCount: count,
      total,
    });
  };

  // Clear booking when search changes
  const handleSearchChange = () => {
    setSelectedFlight(null);
    setConfirmation(null);
    setValidationError('');
    handleSearch();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Training Flights</h1>
        <p className="training-notice">
          TRAINING ONLY — simulated booking, no ticket issued
        </p>
      </header>

      <main className="main">
        {/* Search Section */}
        <section className="search-section">
          <h2>Search Flights</h2>
          <div className="search-form">
            <div className="form-group">
              <label htmlFor="origin">From</label>
              <input
                id="origin"
                type="text"
                value={searchOrigin}
                onChange={(e) => setSearchOrigin(e.target.value)}
                onBlur={handleSearchChange}
                placeholder="Airport code"
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">To</label>
              <input
                id="destination"
                type="text"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                onBlur={handleSearchChange}
                placeholder="Airport code"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                onBlur={handleSearchChange}
              />
            </div>

            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          <h2>Available Flights</h2>
          {filteredFlights.length === 0 ? (
            <p className="no-flights">
              No flights found for {airportLabels[normalizeCode(searchOrigin)] || searchOrigin} to{' '}
              {airportLabels[normalizeCode(searchDestination)] || searchDestination} on{' '}
              {searchDate}. Try a different search.
            </p>
          ) : (
            <div className="flights-list">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className={`flight-card ${selectedFlight?.id === flight.id ? 'selected' : ''}`}
                  onClick={() => handleSelectFlight(flight)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectFlight(flight)}
                >
                  <div className="flight-header">
                    <span className="flight-id">{flight.id}</span>
                    <span className="airline">{flight.airline}</span>
                  </div>
                  <div className="flight-route">
                    {flight.origin} → {flight.destination}
                  </div>
                  <div className="flight-time">{flight.departure}</div>
                  <div className="flight-price">₹{flight.priceInr}/person</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Booking Form */}
        {selectedFlight && !confirmation && (
          <section className="booking-section">
            <h2>Booking Details</h2>
            <div className="booking-form">
              <div className="form-group">
                <label htmlFor="name">Passenger Name</label>
                <input
                  id="name"
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Test Traveller"
                />
              </div>

              <div className="form-group">
                <label htmlFor="count">Number of Passengers</label>
                <input
                  id="count"
                  type="number"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                  min="1"
                  max="6"
                />
              </div>

              <div className="booking-summary">
                <p>
                  <strong>Flight:</strong> {selectedFlight.id} ({selectedFlight.airline})
                </p>
                <p>
                  <strong>Route:</strong> {selectedFlight.origin} → {selectedFlight.destination}
                </p>
                <p>
                  <strong>Departure:</strong> {selectedFlight.departure}
                </p>
                <p>
                  <strong>Total:</strong> ₹
                  {selectedFlight.priceInr * passengerCount}
                </p>
              </div>

              {validationError && (
                <div className="error-message">{validationError}</div>
              )}

              <button className="btn btn-success" onClick={handleBooking}>
                Confirm Booking
              </button>
            </div>
          </section>
        )}

        {/* Confirmation Section */}
        {confirmation && (
          <section className="confirmation-section">
            <h2>Booking Confirmation</h2>
            <div className="confirmation-box">
              <div className="confirmation-header">
                <p className="ref-number">Reference: {confirmation.reference}</p>
                <p className="status">Status: {confirmation.status}</p>
              </div>

              <div className="confirmation-details">
                <p>
                  <strong>Passenger:</strong> {confirmation.passengerName}
                </p>
                <p>
                  <strong>Number of Passengers:</strong> {confirmation.passengerCount}
                </p>
                <p>
                  <strong>Flight:</strong> {confirmation.airline} {confirmation.origin} →{' '}
                  {confirmation.destination}
                </p>
                <p>
                  <strong>Date:</strong> {confirmation.date}
                </p>
                <p>
                  <strong>Departure:</strong> {confirmation.departure}
                </p>
                <p className="total">
                  <strong>Total Cost:</strong> ₹{confirmation.total}
                </p>
              </div>

              <p className="training-notice">
                TRAINING ONLY — simulated booking, no ticket issued
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setConfirmation(null);
                  setSelectedFlight(null);
                  setPassengerName('Test Traveller');
                  setPassengerCount(1);
                }}
              >
                Book Another Flight
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
