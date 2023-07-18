class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(name: string, bookings: Booking[], rate: number, discount: number) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
    if (discount > 100) {
      throw new Error("Discount must be less than 100%");
    }
  }

  isOccupied(date: Date): boolean {
    let occupied = false;

    this.bookings.forEach((booking) => {
      if (
        date.getTime() >= booking.checkIn.getTime() &&
        date.getTime() <= booking.checkOut.getTime()
      ) {
        occupied = true;
      }
    });

    return occupied;
  }

  occupancyPercentage(startDate: Date, endDate: Date): number | string {
    let countDays = 0;
    let day = 1000 * 3600 * 24;
    let daysDifference =
      Math.ceil((endDate.getTime() - startDate.getTime()) / day) + 1;
    let occupied: boolean[] = [];

    if (startDate.getTime() > endDate.getTime()) {
      return "La fecha de inicio no puede ser mayor que la fecha de fin.";
    }

    do {
      occupied.push(
        this.isOccupied(new Date(startDate.getTime() + countDays * day))
      );
      countDays++;
    } while (startDate.getTime() + day * countDays <= endDate.getTime());

    let totalOccupied = occupied.filter((item) => item).length;

    return Math.floor((totalOccupied / daysDifference) * 100);
  }

  static totalOccupancyPercentage(
    rooms: Room[],
    startDate: Date,
    endDate: Date
  ): number {
    let occupancy = 0;

    rooms.forEach((room) => {
      const result = room.occupancyPercentage(startDate, endDate);

      if (typeof result === "number") {
        occupancy += result;
      } else {
        occupancy = 0;
      }
    });

    const percentageTotal = occupancy / rooms.length;
    return percentageTotal;
  }

  static availableRooms(
    rooms: Room[],
    startDate: Date,
    endDate: Date
  ): Room[] {
    const roomsAvailable: Room[] = [];

    rooms.forEach((room) => {
      if (room.occupancyPercentage(startDate, endDate) === 0) {
        roomsAvailable.push(room);
      }
    });

    return roomsAvailable;
  }
}

class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: Room;

  constructor(
    name: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    discount: number,
    room: Room
  ) {
    this.name = name;
    this.email = email;

    if (!(checkIn instanceof Date)) {
      throw new Error("checkIn should be instanceof Date");
    }

    if (!(checkOut instanceof Date)) {
      throw new Error("checkOut should be instanceof Date");
    }

    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;

    if (discount > 100) {
      throw new Error("Discount must be less than 100%");
    }

    this.room = room;
  }

  getFee(): number {
    let priceRoom = this.room.rate;
    let durationInDays = (this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60 * 24);
    let discountRoom = priceRoom - (priceRoom * this.room.discount / 100);
    let fee = discountRoom * durationInDays;
    let discountBooking = fee - (fee * this.discount / 100); // Aplicar el descuento en la reserva

    return discountBooking;
  }
}

export { Room, Booking };
