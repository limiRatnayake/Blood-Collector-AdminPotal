$(function() {

    let dataTable = $('#EventViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });

    eventsRef.onSnapshot(function(querySnapshot) {
        dataTable.clear().draw();
        let rowCount = 1;

        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            console.log(data);

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
                    '<div class="table-data-feature ">' +
                    '<button class="reqEventView" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="View">' +
                    '<i class="fas fa-eye"></i>' +
                    '</button>' +
                    '<button id="" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Approve">' +
                    '<i class="fas fa-check"></i>' +
                    '</button>' +
                    '<button id="" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Reject">' +
                    ' <i class="fas fa-times"></i>' +
                    '</button>' +
                    '</div>'



                ]).draw();
        })
    });

    $('#EventViewTable tbody').on('click', '.reqEventView', function(e) {
        //var data = table.row( $(this).parents('tr') ).data();
        console.log("View cliked!");
        alert("Hello");
    });
});