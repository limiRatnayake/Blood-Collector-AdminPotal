$(function() {



    $(document).ready(function() {
        $("#addClusterBankBtn").click(function() {
            $("#bloodBankModal ").modal({

            });
        });
    });

    let dataTable = $('#hospitalViewTable').DataTable({

        destroy: true,
        scrollX: true,
        searching: false
    });

    $("#formAddBloodBank").validate({
        rules: {
            txtBloodBankName: "required",
            txtBloodBankAddress: "required",
            txtDescription: "required",
            hospitalLatitude: "required",
            hospitalLongitude: "required",
        },
        messages: {
            txtBloodBankName: " Enter Blood Bank Name",
            txtBloodBankAddress: " Enter Blood Bank Address",
            hospitalLatitude: " Enter the Latitude value",
            hospitalLongitude: " Enter the Longitude value",
        }
    });



    $('#formAddBloodBank').ready(function() {
        $(document).on("click", "#btnSaveDetails", () => {
            if ($("#formAddBloodBank").valid()) {
                console.log("success!!");

                var bloodBankName = $("#txtBloodBankName").val();
                console.log(bloodBankName);
                var bloodBankAddress = $("#txtBloodBankAddress").val();
                var description = $("#txtDescription").val();
                var hospitalLatitude = $("#hospitalLatitude").val();
                var hospitalLongitude = $("#hospitalLongitude").val();

                db.collection(COLLECTION_HOSPITALS).add({
                        bloodBankName: bloodBankName,
                        bloodBankAddress: bloodBankAddress,
                        description: description,
                        hospitalLatitude: hospitalLatitude,
                        hospitalLongitude: hospitalLongitude
                    }).then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        $("#formAddBloodBank").trigger("reset");
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
            }
        });



    });
    //clear once form is submitted
    $('#formAddBloodBank').ready(function() {
        $(document).on("click", "#btnClear", () => {
            $("#formAddBloodBank").trigger("reset");
        });
    });


    hospitalListRef.onSnapshot(function(querySnapshot) {
        dataTable.clear().draw();
        let rowCount = 1;

        querySnapshot.forEach(function(doc) {
            let data = doc.data();

            dataTable.row.add(
                [
                    rowCount++,
                    data.bloodBankName,
                    data.bloodBankAddress,
                    data.description,
                    data.hospitalLatitude,
                    data.hospitalLongitude
                ]).draw();

        })

    });


});