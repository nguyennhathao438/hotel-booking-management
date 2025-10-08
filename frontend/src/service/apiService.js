import axios from "axios";

export default class ApiService {
    static BASE_URL = "http://localhost:8080/hotel_booking";
    static getToken (){
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTkxMjczOCwiaWF0IjoxNzU5OTA1NTM4LCJqdGkiOiI4OWZmZTg1Ni01ZTU5LTQ1ODktYTI4Mi0zY2NhNTQwOGQ2OWMiLCJzY29wZSI6IiJ9.DMMBx3vZT04McOWlW3Tq58agFGtJeHwRIRRCAAt2CtPeqFqfttjlOUZshI-a7I624-yriFAZb7WAmu6vexc-Tw";
        return token;
    }

    static getHeader() {
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTkxMjczOCwiaWF0IjoxNzU5OTA1NTM4LCJqdGkiOiI4OWZmZTg1Ni01ZTU5LTQ1ODktYTI4Mi0zY2NhNTQwOGQ2OWMiLCJzY29wZSI6IiJ9.DMMBx3vZT04McOWlW3Tq58agFGtJeHwRIRRCAAt2CtPeqFqfttjlOUZshI-a7I624-yriFAZb7WAmu6vexc-Tw";
        return {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }


    static async getAllHotel() {
        let respone = await axios.get(`${this.BASE_URL}/api/hotels/all`, {
            headers: this.getHeader(),
        })
        return respone.data
    }

    static async postHotel(hotelData) {
        const respone = await axios.post("http://localhost:8080/hotel_booking/api/hotels/create",
            hotelData, {
            headers: this.getHeader()
        })
        return respone.data;
    }
    static async postImgHotel(formData) {
        await axios.post("http://localhost:8080/hotel_booking/images/upload",
            formData, {
            headers: {
                "Authorization" : `Bearer ${this.getToken()}`
            }
        })
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
