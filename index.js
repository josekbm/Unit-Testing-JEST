class Room {
    constructor({ name, bookings, rate, discount }) {
      this.name = name; // string
      this.bookings = bookings; // array of booking objects
      this.rate = rate; // int price in cents
      this.discount = discount; // int percentage
    }
    dateArray(startDate, endDate) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let dateArray = [];
    
        while (start <= end) {
            dateArray.push(new Date(start).toISOString().slice(0, 10));
            start.setDate(start.getDate() + 1);
        }
        return dateArray;
    }

    isOccupied(date) {
        for (let booking of this.bookings) {
            if (date >= booking.checkIn && date < booking.checkOut) {
                return true;
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        const dates = this.dateArray(startDate, endDate);
        let daysOccupied = [];
        let daysOff = [];
        for (let date of dates) {
            this.isOccupied(date)
            ? daysOccupied.push("+1 occupied")
            : daysOff.push("+1 off");
        }
        let totalDaysOcuppied = daysOccupied.length;
        let totalDaysOff = daysOff.length;
        let totalDays = totalDaysOcuppied + totalDaysOff;
        let result = (totalDaysOcuppied * 100) / totalDays;
        return Math.round(result);
    }

}

class Booking {
    constructor({ name, email, checkIn, checkOut, discount, room }) {
        this.name = name; // string
        this.email = email; // string
        this.checkIn = checkIn; // date
        this.checkOut = checkOut; // date
        this.discount = discount; // int percentage
        this.room = room; // a room object
    }

    getFee() {
        const price = this.room.rate;
        const discountRoom = (price * this.room.discount) / 100;
        const discountBooking = (price * this.discount) / 100;
        if (discountBooking + discountRoom < price) {
            return Math.round(price - (discountBooking + discountRoom));
        } else {
            return 0;
        }
    }
}


function totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalOccupancy = 0;
    for (let room of rooms) {
      totalOccupancy +=
        room.occupancyPercentage(startDate, endDate) / rooms.length;
    }
    return Math.round(totalOccupancy);
  }
  
  function availableRooms(rooms, startDate, endDate) {
    let availableRooms = [];
    for (let room of rooms) {
      if (room.occupancyPercentage(startDate, endDate) === 0) {
        availableRooms.push(room);
      }
    }
    return availableRooms.length;
  }
  

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };