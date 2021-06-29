const cron = require("node-cron");
const Customer = require('../database/models/customerModel');

module.exports = async () => {
    cron.schedule("0 1 * * *", async () => {
        console.log("running a task every minute");
        let customers = await Customer.find({
            city: 'Barranquilla'
        });
        for (const customer of customers) {
            // Do something
        }
    });
}