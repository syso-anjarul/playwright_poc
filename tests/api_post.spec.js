const{test,expect}=require('@playwright/test');


test.describe('API POST tests',()=>{
    test('POST request to create a new user',async({request})=>{
        const response=await request.post('booking',{
            data:{
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                                    "checkin" : "2018-01-01",
                                    "checkout" : "2019-01-01"
                                 },
                "additionalneeds" : "Breakfast"
                }
            })
            const responseBody=await response.json()
            console.log(responseBody);
            //validate response status code
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

            
        })
        
});