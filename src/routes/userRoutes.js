const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(userSchema.createUserSchema),
    userController.createUser
);

router.put('/:id',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(userSchema.updateUserSchema),
    userController.updateUser
);

router.put('/:id/update-password',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(userSchema.updateUserPasswordSchema),
    userController.updateUserPassword
);

router.get('/:id',
    tokenValidation.validateToken,
    userController.getUserById
);

router.post('/signup',
    joiSchemaValidation.validateBody(userSchema.signup),
    userController.signup
);

router.post('/login',
    joiSchemaValidation.validateBody(userSchema.login),
    userController.login
)

router.post('/forgot-password',
    joiSchemaValidation.validateBody(userSchema.forgotPassword),
    userController.forgotPassword
)

router.post('/reset-password',
    joiSchemaValidation.validateBody(userSchema.resetUserPassword),
    userController.resetUserPassword
)

module.exports = router;