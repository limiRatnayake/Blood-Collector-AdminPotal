$(function() {


    let campEventViewTable = $('#CampEventViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });
    //hide some columns
    campEventViewTable.columns(1).visible(false);
    campEventViewTable.columns(13).visible(false);


    //querySnapshot catch the changes in the firebase
    eventsRef.onSnapshot(function(querySnapshot) {
        campEventViewTable.clear().draw();
        let rowCount = 1;
        querySnapshot.forEach(function(doc) {
            let data = doc.data();

            // If the category is request don't display data)
            if (data.category == "request") {
                return false;
            }


            campEventViewTable.row.add(
                [
                    rowCount++,
                    data.docRef,
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
                    data.approved,
                    data.rejectReason,
                    '<button type="button" class="btn btn-outline-success btn-sm btnApprove">Approve</button>' +
                    '   ' +
                    '<button type="button" class="btn btn-outline-danger btn-sm btnReject">Reject</button>' +
                    '</div>'
                ]).draw();

        })
    });

    //toast a messae when its approved or rejected
    const Toast = Swal.mixin({
        toast: true,
        type: "success",
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    })

    $('#CampEventViewTable tbody').on('click', '.btnApprove', function() {

        var data = campEventViewTable.row($(this).parents('tr')).data();
        var docRef = data[1];
        var approved = data[13];
        var rejectedReason = data[14];

        console.log(approved)
        console.log(rejectedReason)

        if (approved == false && rejectedReason == 'None') {
            Swal.fire({
                title: "Are you sure?",
                text: "You can always change your mind later!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                allowOutsideClick: false,
            }).then(result => {
                if (result.value) {
                    eventsRef
                        .doc(docRef)
                        .update({
                            approved: true,
                            // rejectReason: ""
                        });
                    Toast.fire({
                        icon: 'success',
                        title: 'Event is Approved!',

                    })
                }
            });
        } else if (approved == true) {
            Swal.fire(
                "Approved!",
                "It's already been Approved !",
                "info"
            );
        } else {
            Swal.fire(
                "Rejected!",
                "It's already been rejected !",
                "warning"
            );
        }

    });


    $('#CampEventViewTable tbody').on('click', '.btnReject', function() {

        console.log("press");
        var data = campEventViewTable.row($(this).parents('tr')).data();
        var docRef = data[1];
        var approved = data[13];
        var rejectedReason = data[14];

        if (rejectedReason == 'None') {
            Swal.fire({
                title: "Tell us why you are rejecting!?",
                // text: "Tell us why you are rejecting!",
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off',
                    maxlength: 50
                },
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                allowOutsideClick: false,
                preConfirm: (response) => {
                    if (response == "") {
                        Swal.showValidationMessage(
                            `Request failed: Feild should not be empty`
                        )
                    }

                }
            }).then(result => {
                if (result.value) {
                    value = result.value
                    eventsRef
                        .doc(docRef)
                        .update({
                            rejectReason: value,
                            approved: !approved
                        });
                    Toast.fire({
                        icon: 'success',
                        title: 'Event is Rejected!'
                    })
                }
            });
        } else {
            Swal.fire(
                "Rejected!",
                "It's already been Rejected!",
                "error"
            );
        }

    });


});