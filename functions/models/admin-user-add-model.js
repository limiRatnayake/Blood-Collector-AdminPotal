const firebaseAdmin = require("../config/firebase-admin-config");

const db = firebaseAdmin.firestore();

module.exports = async(req, res) => {
    try {
        // var data = await _getUserData(req.body);
        var data = req.body;
        console.log(data)
        const email = data.email;
        const displayName = data.firstName;
        const address = data.address;
        const bloodGroup = data.bloodGroup;
        const disabled = data.disabled;
        const lastName = data.lastName;
        const mobileNo = data.mobileNo;
        const userRole = data.userRole;
        const proPicUrl = data.proPicUrl;
        const gender = data.gender;
        const birthDate = data.birthDate;

        const userRecord = await firebaseAdmin.auth().createUser({
                email: email,
                displayName: displayName
            })
            // .then(function(userRecord) {
            //     // See the UserRecord reference doc for the contents of userRecord.
            //     console.log('Successfully created new user:', userRecord.uid);
            //     return db
            //         .collection("users")
            //         .doc(userRecord.uid)
            //         .set({
            //             uid: userRecord.uid,
            //             address: address,
            //             bloodGroup: bloodGroup,
            //             disabled: disabled,
            //             email: email,
            //             firstName: firstName,
            //             lastName: lastName,
            //             mobileNo: mobileNo,
            //             userRole: userRole,
            //         });

        // })
        // .catch(function(error) {
        //     console.log('Error creating new user:', error);
        // });


        await db.collection("users")
            .doc(userRecord.uid)
            .set({
                uid: userRecord.uid,
                address: address,
                bloodGroup: bloodGroup,
                disabled: disabled,
                email: email,
                firstName: displayName,
                lastName: lastName,
                gender: gender,
                mobileNo: mobileNo,
                userRole: userRole,
                proPicUrl: proPicUrl,
                birthDate: birthDate
            });

        res.send({
            code: 200,
            data: userRecord.uid,
        });

    } catch (err) {
        console.log("Errors:", err);
        if (err) {
            res.send({
                code: 400,
                errors: err.errors,
            });
        } else {
            res.send({
                code: 400,
                errors: [err],
            });
        }
    }
};