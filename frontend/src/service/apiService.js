import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080/hotel_booking";
    
    static getHeader() {
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTY4OTA1MSwiaWF0IjoxNzU5NjgxODUxLCJqdGkiOiJmY2U1MWU5Yy04MzJjLTQ1MzgtYWVkMi1hMWUyZjRkN2IxZGYiLCJzY29wZSI6IiJ9.KEJPt64ZSgW6X0Gsqk4Twjyp4882twBo_8KVDZkG1Ye7wu-QO3Rv8hdZutTeQ7ZMXebqi0zdaOys09EMW1StzQ"; 
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    static async getAllHotel(){
        let respone = await axios.get(`${this.BASE_URL}/api/hotels/all`,{
            headers : this.getHeader(),
        })
        return respone.data
    }


    static async getRoomsByHotelId(hotelId) {
        const response = await axios.get(`${this.BASE_URL}/api/rooms/hotel/${hotelId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getImagesByHotelId(hotelId) {
        const response = await axios.get(`${this.BASE_URL}/images/hotel/${hotelId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }
}
