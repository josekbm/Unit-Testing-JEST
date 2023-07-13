const { Room, Booking } = require("./index");

describe("Booking.checkIn es Date", () => {
  test("Es Date", () => {
      expect(new Booking(
        "Suite",
        "email@inmail.com",
        new Date(),
        new Date(),
        0,
        new Room("Suite", [], 1, 0)).checkIn instanceof Date).toBeTruthy();
  });

  test("Es String", () => {
      expect(() => new Booking(
        "Suite", 
        "email@inmail.com", 
        "12/12/12", 
        new Date(), 
        0, 
        new Room("Suite", [], 1, 0))).toThrow();
  });

  test("Es null", () => {
      expect(() => new Booking(
        "Suite", 
        "email@inmail.com", 
        null, 
        new Date(), 
        0, 
        new Room("Suite", [], 1, 0))).toThrow();
  });
});

describe("Booking.checkOut es Date", () => {
  test("Es Date", () => {
      expect(new Booking(
        "Suite", 
        "email@inmail.com", 
        new Date(), 
        new Date(), 
        0, 
        new Room("Suite", [], 1, 0)).checkOut instanceof Date).toBeTruthy();
  });

  test("Es String", () => {
      expect(() => new Booking(
        "Suite", 
        "email@inmail.com",
        new Date(), 
        "12/12/12", 
        0, 
        new Room("Suite", [], 1, 0))).toThrow();
  });

  test("Es null", () => {
      expect(() => new Booking(
        "Suite", 
        "email@inmail.com", 
        new Date(), 
        null, 
        0, 
        new Room("Suite", [], 1, 0))).toThrow();
  });
});

describe("Ocupación en una fecha determinada", () => {
  test("devolverá true (habitación ocupada)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );
    const booking3 = new Booking(
      "Booking3",
      "example1@exaple",
      new Date("04/20/2023"),
      new Date("04/22/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1, booking2, booking3], 1000, 10);

    expect(room1.isOccupied(new Date("04/21/2023"))).toBe(true);
  });

  test("devolverá false (habitación disponible)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );
    const booking3 = new Booking(
      "Booking3",
      "example1@exaple",
      new Date("04/20/2023"),
      new Date("04/22/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1, booking2, booking3], 1000, 10);

    expect(room1.isOccupied(new Date("04/23/2023"))).toBe(false);
  });
});

describe("Porcentaje de días con ocupación", () => {
  test("devolverá 0 (sin ocupación)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );
    const booking3 = new Booking(
      "Booking3",
      "example1@exaple",
      new Date("04/20/2023"),
      new Date("04/22/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1, booking2, booking3], 1000, 10);

    expect(
      room1.occupancyPercentage(new Date("04/23/2023"), new Date("04/24/2023"))
    ).toBe(0);
  });

  test("devería devolver 100% (100% de ocupación)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );
    const booking3 = new Booking(
      "Booking3",
      "example1@exaple",
      new Date("04/20/2023"),
      new Date("04/22/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1, booking2, booking3], 1000, 10);

    expect(
      room1.occupancyPercentage(new Date("04/16/2023"), new Date("04/22/2023"))
    ).toBe(100);
  });

  test("devería devolver 50 (50% de ocupación)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );
    const booking3 = new Booking(
      "Booking3",
      "example1@exaple",
      new Date("04/20/2023"),
      new Date("04/22/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1, booking2, booking3], 1000, 10);

    expect(
      room1.occupancyPercentage(new Date("04/16/2023"), new Date("04/29/2023"))
    ).toBe(50);
  });
});

describe("Array con habitaciones no ocupadas", () => {
  test("devería ser igual a un array vacío (no hay habitaciones libres)", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.availableRooms(rooms, new Date("04/16/2023"), new Date("04/20/2023"))
    ).toEqual([]);
  });

  test("devería ser igual a room1", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.availableRooms(rooms, new Date("04/19/2023"), new Date("04/20/2023"))
    ).toEqual([room1]);
  });

  test("devería ser igual a room2", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/18/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.availableRooms(rooms, new Date("04/16/2023"), new Date("04/17/2023"))
    ).toEqual([room2]);
  });
});

describe("Porcentaje de ocupación en todas las habitaciones", () => {
  test("devería devolver 100", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("04/16/2023"),
        new Date("04/18/2023")
      )
    ).toEqual(100);
  });

  test("devería devolver 80", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("04/16/2023"),
        new Date("04/20/2023")
      )
    ).toEqual(80);
  });

  test("devería devolver 0", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("04/21/2023"),
        new Date("04/22/2023")
      )
    ).toEqual(0);
  });

  test("devería devovler 50", () => {
    const booking1 = new Booking(
      "Booking1",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/18/2023"),
      30,
      {}
    );
    const booking2 = new Booking(
      "Booking2",
      "example1@exaple",
      new Date("04/16/2023"),
      new Date("04/20/2023"),
      30,
      {}
    );

    const room1 = new Room("Double Superior", [booking1], 1000, 10);
    const room2 = new Room("Double Superior", [booking2], 1000, 10);

    const rooms = [room1, room2];

    expect(
      Room.totalOccupancyPercentage(
        rooms,
        new Date("04/19/2023"),
        new Date("04/20/2023")
      )
    ).toEqual(50);
  });
});

describe("Comprobar la tarifa total de un booking", () => {
  test("Devolverá la tarifa valor por noche con un 20% y 20% de booking", () => {
    const room = new Room("single bed", [], 100, 20);
    const booking = new Booking(
      "Kevin",
      "kevinFrost@inmail.com",
      new Date('2023-06-01'),
      new Date('2023-06-06'),
      20,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(320);
  });
  test("Devolverá la tarifa valor por noche cuando ambos descuentos sean 0%", () => {
    const room = new Room("single bed", [], 100, 0);
    const booking = new Booking(
      "Kevin",
      "kevinFrost@inmail.com",
      new Date('2023-06-01'),
      new Date('2023-06-06'),
      0,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(500);
  });
  test("Devolverá la tarifa valor por noche con un 25% y 10% de booking", () => {
    const room = new Room("single bed", [], 100, 25);
    const booking = new Booking(
      "Kevin",
      "kevinFrost@inmail.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      10,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(270);
  });
  test("Devolverá la tarifa valor por noche con un 50% y 10% de booking", () => {
    const room = new Room("single bed", [], 300, 50);
    const booking = new Booking(
      "Kevin",
      "kevinFrost@inmail.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      10,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(540);
  });
  test("Devolverá la tarifa valor por noche con un 30% y 0% de booking", () => {
    const room = new Room("single bed", [], 300, 30);
    const booking = new Booking(
      "Kevin",
      "kevinFrost@inmail.com",
      new Date('2023-06-01'),
      new Date('2023-06-05'),
      0,
      room
    );
    room.bookings = booking;

    expect(booking.getFee()).toBe(840);
  });

  test("Devolverá error cuando los descuentos sean superiores al 100%", () => {
    expect(() => {
      new Booking(
        "Suite",
        "kevinFrost@inmail.com",
        new Date('2023-06-01'),
        new Date('2023-06-05'),
        110,
        new Room("single bed", [], 300, 100)
      ).getFee();
    }).toThrow();
  });
    
});