const{test,expect}=require('@playwright/test');
const payloadBody=require('../test-data/payload.json');
const { faker, fa } = require('@faker-js/faker');
const {DateTime} = require('luxon');

// Generate dynamic data
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let totalPrice = faker.number.int(1000);
let checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
let checkOutDate = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd');

test.describe('API POST Tests',()=>{
    test('POST request with Dynamic JSON  payload',async({request})=>{
        const response=await request.post('booking',{
            data:{
                "firstname" : firstName,
                "lastname" : lastName,
                "totalprice" : totalPrice,
                "depositpaid" : true,
                "bookingdates" : {
                                    "checkin" : checkInDate,
                                    "checkout" : checkOutDate
                                 },
                "additionalneeds" : "Breakfast"

            }
        }); 
        const responseBody=await response.json();
        console.log(responseBody);

        expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
            //validate response body
            expect(responseBody).toHaveProperty('bookingid');
            expect(responseBody.booking).toMatchObject({
                "firstname" : firstName,
                "lastname" : lastName,
                "totalprice" : totalPrice,
                "depositpaid" : true,
                "bookingdates" : {
                                    "checkin" : checkInDate,
                                    "checkout" : checkOutDate
                                 },
                "additionalneeds" : "Breakfast"
          });
    });

});