import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080/hotel_booking";
    
    static getHeader() {
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTcxOTcyMSwiaWF0IjoxNzU5NzEyNTIxLCJqdGkiOiI1MjE1Y2M2Yy0xM2RkLTRlMDctODYzNi05MjgyYjdkNWEwNzAiLCJzY29wZSI6IiJ9.V1_0p39GOBxDP_WzA9OJ6hek_yzakWcdnbvoh_tNB85xYUS-aKvkS5P5fV3Ba2wo8xKjz60mJhE5B1aawkkNCg"; 
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
