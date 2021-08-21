# cab_booking
cab booking backend

STEPS
1> To run the server : npm start
2> By default i had created 1 default user and 1 default driver
    --> user credentials
        1> country_code : +91
        2> phone_no : 8219192328
        3> password : qwerty

    --> driver credentials
        1> country_code : +91
        2> phone_no : 9192939495
        3> password : qwerty
    
3> If you dont want to use you can create new user and new driver from above APIS
    --> /User/signup     (FOR CREATING NEW USER)
    --> /Driver/signup   (FOR CREATING NEW DRIVER)

4> LOGIN APIS
    --> /User/login
    --> /Driver/login

5> USER CAN SEE NEAR BY DRIVERS
    --> /User/near_by_drivers

6> ESTIMATE BOOKING PRICE CALCULATION FROM ONE LOCATION TO ANOTHER
    --> /User/calculate_price

7> USER CAN NEW BOOKING
    --> /User/create_booking

8> DRIVER CAN LIST RECEIVED BOOKINGS (ONLY BOOKINGS WITH PENDING AND ACCEPT status ARE VISIBLE IN THIS API)
    --> /Driver/list_bookings

9> DRIVER CAN CHANGE BOOKING STATUS 
    --> /Driver/manage_bookings

10> USER CAN SEE ACTIVE BOOKINGS 
    --> /User/list_active_bookings

11> USER CAN CANCEL BOOKINGS
    --> /User/cancel_bookings

12> USER CAN SEE OLD BOOKINGS (BOOKING HISTORY)
    --> /User/booking_history

13> DRIVER CAN SEE OLD BOOKINGS (BOOKING HISTORY)
    --> /Driver/booking_history

14> USER LOGOUT API
    --> /User/logout

15> DRIVER LOGOUT API
    --> /Driver/logout