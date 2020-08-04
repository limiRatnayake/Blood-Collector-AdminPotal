$(function() {

    let reqEventViewTable = $('#ReqEventViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });

    //hide some columns
    reqEventViewTable.columns(1).visible(false);
    reqEventViewTable.columns(15).visible(false);
    // reqEventViewTable.columns(16).visible(false);


    eventsRef.onSnapshot(function(querySnapshot) {
        reqEventViewTable.clear().draw();
        let rowCount = 1;
        querySnapshot.forEach(function(doc) {
            let data = doc.data();

            // If the category is campaign don't display data
            if (data.category == "campaign") {
                return false;
            }

            reqEventViewTable.row.add(
                [
                    rowCount++,
                    data.docRef,
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
                    data.approved,
                    data.rejectReason,
                    '<button type="button" class="btn btn-outline-success btn-sm btnApprove" id="btnApprove">Approve</button>' +
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

    $('#ReqEventViewTable tbody').on('click', '.btnApprove', function() {

        var data = reqEventViewTable.row($(this).parents('tr')).data();
        var docRef = data[1];
        var approved = data[15];
        var rejectedReason = data[16];


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




    $('#ReqEventViewTable tbody').on('click', '.btnReject', function() {

        console.log("press");
        var data = reqEventViewTable.row($(this).parents('tr')).data();
        var docRef = data[1];
        var approved = data[15];
        var rejectedReason = data[16];

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