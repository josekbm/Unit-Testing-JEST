const { Room, Booking } = require("./index");

// tests de getFee()

test("get Fee() Descuento del 50%", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 20000,
      discount: 20,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 30,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(10000);
  });
  
  test("get Fee() Sin descuento, devuelve el mismo precio", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 30000,
      discount: 0,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 0,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(30000);
  });
  
  test("get Fee() descuento del 100%", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 15000,
      discount: 40,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 60,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(0);
  });
  
  test("get Fee() roomDiscount igual a 0", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 50000,
      discount: 0,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 40,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(30000);
  });
  
  test("get Fee() bookingDiscount igual a 0", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 25000,
      discount: 20,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 0,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(20000);
  });
  
  test("get Fee() descuento de más del 100%", () => {
    let room = new Room({
      name: "Double Superior",
      bookings: [],
      rate: 15000,
      discount: 60,
    });
    let booking = new Booking({
      name: "Kevin",
      email: "kevinFrost@inmail.com",
      checkIn: "2022-01-10",
      checkOut: "2022-01-15",
      discount: 80,
      room: room,
    });
  
    room.bookings = [booking];
    expect(booking.getFee()).toBe(0);
  });
  