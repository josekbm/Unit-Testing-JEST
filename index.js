class Room {
    constructor(name, bookings, rate, discount) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
      if (discount > 100)
        throw new Error ("Discount must be less than 100%");
    }
  
    isOccupied(date) {
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
  
    occupancyPercentage(startDate, endDate) {
      let countDays = 0;
  
      let day = 1000 * 3600 * 24;
  
      let daysDifference =
        Math.ceil((endDate.getTime() - startDate.getTime()) / day) + 1;
  
      let occupied = [];
  
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
  
    static totalOccupancyPercentage(rooms, startDate, endDate) {
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
  
    static availableRooms(rooms, startDate, endDate) {
      const roomsAvailable = [];
  
      rooms.forEach((room) => {
        if (room.occupancyPercentage(startDate, endDate) === 0) {
          roomsAvailable.push(room);
        }
      });
  
      return roomsAvailable;
    }
  }
  
  class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
      this.name = name;
      this.email = email;
      if (!(checkIn instanceof Date))
            throw new Error("checkIn should be instaceof Date");
      if (!(checkOut instanceof Date))
            throw new Error("checkOut should be instaceof Date");
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      if (discount > 100)
        throw new Error ("Discount must be less than 100%");
      this.room = room;

      

    }
  
    getFee() {
      let priceRoom = this.room.rate;
        let durationInDays = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);
        let discountRoom = priceRoom - (priceRoom * this.room.discount / 100);
        let fee = discountRoom * durationInDays;
        let discountBooking = fee - (fee * this.discount / 100); // Aplicar el descuento en la reserva

        return discountBooking;
      
      
  }
  }
  
  module.exports = { Room, Booking };