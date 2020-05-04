module.exports = function renderContact(contacts, res, partial) {
    if (partial === undefined) {
        return res.json(contacts);
    }
    var newContacts = contacts;
    // If a single object add to an array
    if (!Array.isArray(contacts)) {
        newContacts = [contacts];
    }
    var arrOfObjs = newContacts.map(({dataValues: {id, name, email, phone, type}}) => ({
        id,
        name,
        email,
        phone,
        type
    }));

    // console.log(arrOfObjs)
    var x = {
        layout: false,
        applications: arrOfObjs
    }

    // Partial: "partials/jobs/application-block"
    res.render(partial, x);
}
