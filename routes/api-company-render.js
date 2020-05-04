module.exports = function renderCompanies(companies, res, partial) {
    
    if (partial === undefined) {
        return res.json(companies);
    }
    var newCompany = companies;

    // If a single object add to an array
    if (!Array.isArray(companies)) {
        newCompany = [companies];
    }
    var arrOfObjs = newCompany.map(({ dataValues: { id, name, zipCode, URL, Contacts } }) => ({
        id,
        name,
        zipCode,
        URL,
        contacts: Contacts,

    }));

    var x = {
        layout: false,
        applications: arrOfObjs
    }

    res.render(partial, x);
}
