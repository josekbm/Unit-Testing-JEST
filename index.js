class Room {
    constructor({ name, bookings, rate, discount }) {
      this.name = name; // string
      this.bookings = bookings; // array of booking objects
      this.rate = rate; // int price in cents
      this.discount = discount; // int percentage
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



module.exports = { Room, Booking };