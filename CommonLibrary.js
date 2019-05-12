        // Define the AJAX Function  
        var $ajax = (function(){

            //Define the variable to hold the function implementation
            var that = {};

            //Define the actual AJAX Function implementation
            that.send = function(url, options) {
                // Upon these three Conditions of the url call - the system will call out to
                // each function in turn
                var on_success = options.onSuccess || function(){},
                    on_error   = options.onError   || function(){},
                    on_timeout = options.onTimeout || function(){},
                    timeout    = options.timeout   || 10000; // ms

                //Define a variable to allow for a new HTTP Request
                var xmlhttp = new XMLHttpRequest();

                //Define a function to handle the the ASYNC ready state change from the URL call
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        //console.log('responseText:' + xmlhttp.responseText);
                        try {
                            var data = JSON.parse(xmlhttp.responseText);
                        } catch(err) {
                            console.log(err.message + " in " + xmlhttp.responseText);
                            return;
                        }
                        on_success(data);
                    }else{
                        if(xmlhttp.readyState == 4){
                            on_error();
                        }
                    }
                };

                //Define the timeout period of the AJAX call based on variable constant above
                xmlhttp.timeout = timeout;

                //Upon timeout run ASYNC timeout function
                xmlhttp.ontimeout = function () {
                    on_timeout();
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
            return that;
        })();
