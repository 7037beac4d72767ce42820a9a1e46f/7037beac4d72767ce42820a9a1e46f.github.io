const loggerApiEndpoint = "https://jt-nodejs-jttorate-api.herokuapp.com";
const domainName = "jttorate.com";

/** Save Guest */
guestLogger = (appCode, guestName, guestMsg, callback) => {
  /* CORS Anywhere */
  $.ajaxPrefilter((options) => {
    if (options.crossDomain && jQuery.support.cors) {
      const http = window.location.protocol === "http:" ? "http:" : "https:";
      options.url = http + "//jt-cors-anywhere.herokuapp.com/" + options.url;
    }
  });

  fetch("https://ipapi.co/json/")
    .then((response) => {
      return response.json();
    })
    .then(
      ({
        ip,
        city,
        region,
        country,
        country_name,
        continent_code,
        timezone,
        org,
      }) => {
        /* Get current position by browser geolocation */
        //   navigatorGeolocation((error, coords) => {
        const coords = {
          latitude: 0,
          longitude: 0,
        };
        /** Data set */
        const guestDataSet = `appCode=${appCode}&name=${guestName}&message=${guestMsg}&ipAddress=${ip}&city=${city}&country=${country}&latitude=${coords.latitude}&longitude=${coords.longitude}&timezone=${timezone}&network=${org}`;

        $.ajax({
          type: "POST",
          url: loggerApiEndpoint + "/guest?" + guestDataSet,
          contentType: "application/json",
          dataType: "json",
          success: (data) => {
            /** Set cookie 1 day expiration  */
            setCookie(`${domainName}_guestId`, data.guest._id, 1);
            callback(null, true);
          },
          error: (data) => {
            callback(data);
          },
        });
        //   });
      }
    );
};

/** Save Contact Us */
contactUsForm = (
  { firstName, lastName, email, contactNumber, message },
  callback
) => {
  /* CORS Anywhere */
  $.ajaxPrefilter((options) => {
    if (options.crossDomain && jQuery.support.cors) {
      const http = window.location.protocol === "http:" ? "http:" : "https:";
      options.url = http + "//jt-cors-anywhere.herokuapp.com/" + options.url;
    }
  });

  /** Data set */
  const guestId = getCookie(`${domainName}_guestId`);
  const contactUsDataSet = `guestId=${guestId}&firstName=${firstName}&lastName=${lastName}&email=${email}&contactNumber=${contactNumber}&message=${message}`;

  $.ajax({
    type: "POST",
    url: loggerApiEndpoint + "/contact-us?" + contactUsDataSet,
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      callback(null, true);
    },
    error: (data) => {
      callback(data);
    },
  });
};

/** Login */
loginForm = ({ username, password }, callback) => {
  /* CORS Anywhere */
  $.ajaxPrefilter((options) => {
    if (options.crossDomain && jQuery.support.cors) {
      const http = window.location.protocol === "http:" ? "http:" : "https:";
      options.url = http + "//jt-cors-anywhere.herokuapp.com/" + options.url;
    }
  });

  callback(null, true);
};
