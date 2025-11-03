const{test,expect}=require('@playwright/test');
test.describe('API GET Tests',()=>{
    test('GET request to fetch all bookings',async({request})=>{
        const response=await request.get('booking'); 
        const responseBody=await response.json();
        // console.log(responseBody);
    });
    test('GET request to fetch a specific booking by ID',async({request})=>{
        const bookingId=1;  
        const response=await request.get(`booking/${bookingId}`); 
        const responseBody=await response.json();
        console.log(responseBody);
    });
    test('GET request with query parameters to filter bookings',async({request})=>{
        const response=await request.get('booking',{
            params:{
                firstname:'Jim',
                lastname:'Brown'
            }
        }); 
        const responseBody=await response.json();
        console.log(responseBody);
    });

});