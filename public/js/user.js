$(function() {

    let dataTable = $('#userViewTable').DataTable({
        destroy: true,
        scrollX: true,
        searching: false
    });

    $("#formAddUser").validate({
        rules: {
            txtFName: "required",
            txtLName: "required",
            txtEmail: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,

            },
            confirmPassword: {
                equalTo: "#password"
            },
        },
        messages: {
            txtFName: " Enter First Name",
            txtLName: " Enter Last Name",
            txtEmail: " Enter Valid Email Address!",
            password: " Enter Password",
            confirmPassword: " Enter Confirm Password Same as Password",
            userRole: {
                required: "Please select an option from the list!",
            },
        }
    });

    $('#formAddUser').ready(function() {
        $(document).on("click", "#btnRegister", () => {

            if ($("#formAddUser").valid()) {
                firebase.auth().createUserWithEmailAndPassword($("#txtEmail").val(), $("#password").val())
                    .then(
                        (user) => {
                            //check wether there is a user
                            if (user) {
                                var fName = $("#txtFName").val();
                                var lName = $("#txtLName").val();
                                var email = $("#txtEmail").val();
                                var userRole = $("#userRole").val();
                                var address = '';
                                var birthDate = '';
                                var bloodGroup = '';
                                var mobileNo = '';


                                db.collection(COLLECTION_USERS).add({
                                    firstName: fName,
                                    lastName: lName,
                                    email: email,
                                    address: address,
                                    birthDate: birthDate,
                                    bloodGroup: bloodGroup,
                                    mobileNo: mobileNo,
                                    userRole: userRole

                                }).then(result => {

                                    alert("User is successfuly registred!");

                                    $("#formAddUser").trigger("reset");
                                });
                            }
                        }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        window.alert("Error:" + errorMessage);
                    });
            }

        });

    });
    //clear once form is submitted
    $('#formAddUser').ready(function() {
        $(document).on("click", "#btnClear", () => {
            $("#formAddUser").trigger("reset");
        });
    });


    usersRef.onSnapshot(function(querySnapshot) {
        dataTable.clear().draw();
        let rowCount = 1;

        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            console.log(data);

            dataTable.row.add(
                [
                    rowCount++,
                    data.firstName + " " + data.lastName,
                    data.email,
                    data.userRole,
                    data.address,
                    data.birthDate,
                    data.bloodGroup,
                    data.mobileNo,
                    '<div class="table-data-feature ">' +
                    '<button id="" ' +
                    'class="item " data-toggle="tooltip " data-placement="top " title="Remove">' +
                    ' <i class="zmdi zmdi-delete "></i>' +
                    '</button>' +
                    '</div>'



                ]).draw();

        })

    });
    // $(document).ready(function() {
    //     console.log("ready!");
    //     const showFirestoreDatabase = () => {

    //         db.collection(COLLECTION_USERS).get().then(function(querySnapshot) {
    //             var dataSet = [];
    //             var i = 1;
    //             $('#userViewTable').DataTable().rows().clear().draw();
    //             // $("#userViewTable tr").remove();
    //             querySnapshot.forEach(function(doc) {

    //                 let data = doc.data();
    //                 // $("#rowLogisticDeps").empty();
    //                 if (doc.exists) {
    //                     // console.log("Data exists document:", data);
    //                     dataSet.push([data.first_username, data.last_username, data.email, data.user_role]);
    //                     i = i + 1;
    //                     // $("#userViewTable").html(dataSet.length);
    //                     // console.log("Data shown", dataSet);
    //                 } else {
    //                     console.error("Error")
    //                 }
    //             })
    //             console.log("data", dataSet);
    //             $('#userViewTable').DataTable({
    //                 data: dataSet,
    //                 columns: [
    //                     { title: "Name" },
    //                     { title: "Email" },
    //                     { title: "Role" },
    //                 ],
    //             });

    //         })
    //     }
    //     showFirestoreDatabase();

    // })

});