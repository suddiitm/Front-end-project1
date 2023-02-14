
    // Camera Settings.
    Webcam.set({
        width: 220,
        height: 190,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
    
    Webcam.attach('#camera');

    let onlineTestApp = new function () {

        // Show container to capture picture.
        this.takeSnapshot = function (oButton) {
            document.getElementById('picturebox').style.display = 'block';
        }

        // Get the picture's data uri and provide it the image source.
        let dataURI = '';

        this.addCamPicture = function () {
            Webcam.snap(function (data_uri) {
                dataURI = data_uri;
                document.getElementById('snapShot').innerHTML =
                    '<img src="' + data_uri + '" width="120px" height="100px" id="studentPic" />';
            });
            document.getElementById('picturebox').style.display = 'none';
        }

        this.printPage = function () {

//Add some style to the print. 
    // ref: https://www.encodedna.com/javascript/print-html-table-with-image-using-javascript.htm 
            let style = "<style>";
            style = style + "h2 {text-align:center; font:22px Times New Roman; font-weight:bold;}";
            style = style + ".subject {text-align:center;}";
            style = style + "ul {font:18px Calibri; display:inline-block; list-style:none; margin:0; padding:20px 0;}";
            style = style + ".answers {font:18px Calibri; padding:10px 0;}";
            style = style + ".picture {float:right; padding:10px 0;}";
            style = style + "</style>";   

            // Add date and time (to avoid any any ambiguity concerning submission of paper).
                // ref: https://www.encodedna.com/2012/11/javascript-digital-clock.htm 
            let oDt = new Date();       

            // Get full date.
            let sDate = oDt.getDate() + '/' + (oDt.getMonth() + 1) + '/' + oDt.getFullYear();

            // Get full time.
            let hrs = oDt.getHours();
            let min = oDt.getMinutes();
            let sec = oDt.getSeconds();

            let sTime = hrs + ':' + min + ':' + sec;

            let header = '<h2>Online Test</h2>' +
                '<div class="subject">' + document.getElementById("subject").innerHTML + '</div>' +
                '<ul><li><b>Name of Student</b>: ' + document.getElementById('txtStudentName').value + '</li> ' +
                    '<li><b>Class</b>: ' + document.getElementById('txtClass').value + '</li> ' +
                    '<li><b>Date & Time</b>: ' + sDate + ' (' + sTime + ')</li>' +
                '</ul>';
         
          document.getElementById('txtClass').value + '</li> ' +'<li><b>Date & Time</b>: ' + sDate + ' (' + sTime + ')</li>' +'</ul>';
let theBody = '';

            // attach the image.
            if (dataURI != '') {
                theBody = '<p class="picture"><img src = "' + document.getElementById('studentPic').src + '" width="90px" height="70px" /></p>';
            }

            // get all textarea (anwsers).
            let ele_tArea = document.getElementsByTagName('textarea');

            for (let i = 0; i <= ele_tArea.length - 1; i++) {
                if (theBody === '') {
                    if (ele_tArea[i].value != '') {
                        theBody = '<p class="answers"> <b>Answer ' + (i + 1) + '</b> - ' + ele_tArea[i].value + '</p>';
                    }
                }
                else {
                    if (ele_tArea[i].value != '') {
                        theBody = theBody + '<p class="answers"> <b>Answer ' + (i + 1) + '</b> - ' + ele_tArea[i].value + '</p>';
                    }
                }
            }

            theBody = header + theBody;

            // Create window object and print the data.
            let  newWin = window.open('', '', 'height=700,width=700');

            newWin.document.write(style);
            newWin.document.write(theBody);
            newWin.print();
            newWin.close();
        }
    }