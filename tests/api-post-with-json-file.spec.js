const{test,expect}=require('@playwright/test');
const payloadBody=require('../test-data/payload.json');

test.describe('API POST Tests',()=>{
    test('POST request with JSON file payload',async({request})=>{
        const response=await request.post('booking',{
            data:payloadBody
        }); 
        const responseBody=await response.json();
        console.log(responseBody);

        expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();
            //validate response body
            expect(responseBody).toHaveProperty('bookingid');
            expect(responseBody.booking).toMatchObject({
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                                    "checkin" : "2018-01-01",
                                    "checkout" : "2019-01-01"
                                 },
                "additionalneeds" : "Breakfast"
          });
    });

});