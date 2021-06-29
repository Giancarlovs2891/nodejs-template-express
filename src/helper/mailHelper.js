const sgMail = require('@sendgrid/mail');

const internals = {
    TEMPLATES: {
        quote: process.env.SENDGRID_QUOTE_TEMPLATE,
        forgotPassword: process.env.SENDGRID_FORGOT_PASSWORD_TEMPLATE
    }
}

module.exports.sendMail = async (obj) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    obj.from = obj.from || 'mail@xxxxxxxxxxxxxxxx.com';
    const msg = {
        to: obj.to,
        from: obj.from || process.env.SENDGRID_DEFAULT_FROM,
        templateId: internals.TEMPLATES[obj.type],
        dynamic_template_data: obj.data
    };
    await sgMail.send(msg);
}