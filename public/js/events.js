$(function() {

    let dataTable = $('#ReqEventViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });

    let campDataTable = $('#CampEventViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });


    eventsRef.onSnapshot(function(querySnapshot) {
        dataTable.clear().draw();
        campDataTable.clear().draw();
        let rowCount = 1;
        querySnapshot.forEach(function(doc) {
            let data = doc.data();

            // If userFName column is blank don't display the row(bcz it is campaign feild)
            if (data.userFName == null) {
                return false;
            }

            dataTable.row.add(
                [
                    rowCount++,
                    data.bloodGroup,
                    data.replacementAvailability,
                    data.unitsOfBlood,
                    data.requestClose,
                    data.hospitalName,
                    data.hospitalAddress,
                    data.hospitalLat,
                    data.hospitalLng,
                    data.userFName + " " + data.userLName,
                    data.userPhoneNumber,
                    data.notifyState,
                    data.description,
                    '<a data-fancybox="gallery" href="' +
                    data.imageUrl +
                    '"><img src="' +
                    data.imageUrl +
                    '" height="42"></a>',
                    // '<div class="table-data-feature ">' +
                    // '<button class="reqEventView" id="viewAdditionalDataBtn" style="margin:5px; padding:5px;"' +
                    // 'class="item " data-toggle="tooltip " data-placement="top " title="Approve">' +
                    // '<i class="fas fa-eye"></i>' +
                    // '</button>' +

                    '<button class="reqEventApprove" style="margin:5px;" id="addClusterBankBtn" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Approve">' +
                    '<i class="fas fa-check"></i>' +
                    '</button>' +
                    '  ' +
                    '<button class="reqEventReject" style="margin:5px;  ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Reject">' +
                    ' <i class="fas fa-times"></i>' +
                    '</button>' +
                    '</div>'


                ]).draw();

        })
    });

    eventsRef.onSnapshot(function(querySnapshot) {
        campDataTable.clear().draw();
        let rowCount = 1;
        querySnapshot.forEach(function(doc) {
            let data = doc.data();

            // If nameOftheOrganizer column is blank don't display the row
            if (data.nameOftheOrganizer == null) {
                return false;
            }


            campDataTable.row.add(
                [
                    rowCount++,
                    data.nameOftheOrganizer,
                    data.pickUpDate,
                    data.startTime,
                    data.endTime,
                    data.orgernizerConatctNo,
                    data.placeName,
                    data.placeAddress,
                    data.placeLat,
                    data.placeLng,
                    data.description,
                    '<a data-fancybox="gallery" href="' +
                    data.imageUrl +
                    '"><img src="' +
                    data.imageUrl +
                    '" height="42"></a>',
                    // '<div class="table-data-feature ">' +
                    // '<button class="reqEventView" id="viewAdditionalDataBtn" style="margin:5px; padding:5px;"' +
                    // 'class="item " data-toggle="tooltip " data-placement="top " title="Approve">' +
                    // '<i class="fas fa-eye"></i>' +
                    // '</button>' +

                    '<button class="reqEventApprove" style="margin:5px;" id="addClusterBankBtn" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Approve">' +
                    '<i class="fas fa-check"></i>' +
                    '</button>' +
                    '  ' +
                    '<button class="reqEventReject" style="margin:5px;  ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Reject">' +
                    ' <i class="fas fa-times"></i>' +
                    '</button>' +
                    '</div>'



                ]).draw();

        })
    });
});