(function () {
    "use strict";

    /**
   * Navmenu Scrollspy
   */
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
            if (!navmenulink.hash) return;
            let section = document.querySelector(navmenulink.hash);
            if (!section) return;
            let position = window.scrollY + 200;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
                navmenulink.classList.add('active');
            } else {
                navmenulink.classList.remove('active');
            }
        })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);



    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    // Initialize the object to store the data
    let userData = {};
    // Get Browser Info
    userData.browser = navigator.userAgent;

    // Get Geolocation (if supported)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            userData.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            // Proceed with sending the data after geolocation is fetched
            sendDataToServer();
        }, (error) => {
            // Handle geolocation errors (e.g., user denied permission)
            userData.location = "Geolocation is not available or user denied permission.";
            sendDataToServer();
        });
    } else {
        userData.location = "Geolocation is not supported by this browser.";
        sendDataToServer();
        // console.log(userData); // Log the object if geolocation isn't supported
    }
    // Get Current Time in Y-M-D H-I-S format
    let currentTime = new Date();
    let formattedTime = currentTime.getFullYear() + '-' +
        (currentTime.getMonth() + 1).toString().padStart(2, '0') + '-' +
        currentTime.getDate().toString().padStart(2, '0') + ' ' +
        currentTime.getHours().toString().padStart(2, '0') + ':' +
        currentTime.getMinutes().toString().padStart(2, '0') + ':' +
        currentTime.getSeconds().toString().padStart(2, '0');

    userData.time = formattedTime;

    // Get User Language
    userData.language = navigator.language;
    console.log(userData);


    function sendDataToServer() {

        const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://deep-vasoya.vercel.app';

        fetch(`${apiUrl}/api/save-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => console.log('Data saved:', data))
            .catch((error) => console.error('Error:', error));
    }
})();