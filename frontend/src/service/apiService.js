import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080/api";
    static getToken (){
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc2MDI5MjA4MCwiaWF0IjoxNzYwMjkxMTgwLCJqdGkiOiJjMmU1NWRjMy01MzRhLTQwMDEtODNiZC1mNDk5NzNhNTQyMmYiLCJzY29wZSI6IiJ9.tgakOAP5Pu4GVkA30jY3ndueXMBpQvj35swfONjvFFvU66XnXzynhv0Ny-Wos9T-IM8vpbRYTUe43m1XOF6UsQ";
        return token;
    }

    static getHeader() {
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc2MDI5MjA4MCwiaWF0IjoxNzYwMjkxMTgwLCJqdGkiOiJjMmU1NWRjMy01MzRhLTQwMDEtODNiZC1mNDk5NzNhNTQyMmYiLCJzY29wZSI6IiJ9.tgakOAP5Pu4GVkA30jY3ndueXMBpQvj35swfONjvFFvU66XnXzynhv0Ny-Wos9T-IM8vpbRYTUe43m1XOF6UsQ";
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }


    static async getAllHotel() {
        let respone = await axios.get(`${this.BASE_URL}/hotels/all`, {
            headers: this.getHeader(),
        })
        return respone.data
    }

    static async postHotel(hotelData) {
        const respone = await axios.post(`${this.BASE_URL}/hotels/create`,
            hotelData, {
            headers: this.getHeader()
        })
        return respone.data;
    }
    static async postImgHotel(formData) {
        await axios.post("http://localhost:8080/images/upload",
            formData, {
            headers: {
                "Authorization" : `Bearer ${this.getToken()}`
            }
        })
    }


    static async getRoomsByHotelId(hotelId) {
        const response = await axios.get(`${this.BASE_URL}/rooms/hotel/${hotelId}`, {
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
