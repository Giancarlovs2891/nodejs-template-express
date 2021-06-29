const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const customerAddressController = require('../controller/customerAddressController');
const customerNoteController = require('../controller/customerNoteController');
const customerFileController = require('../controller/customerFileController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const customerSchema = require('../apiSchema/customerSchema');
const customerAddressSchema = require('../apiSchema/customerAddressSchema');
const customerNoteSchema = require('../apiSchema/customerNoteSchema');
const customerFileSchema = require('../apiSchema/customerFileSchema');
const tokenValidation = require('../middleware/tokenValidation');
const multer = require('multer')({
    dest: '/tmp'
})

router.post('/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerSchema.createCustomerSchema),
    customerController.createCustomer
);

router.put('/:id',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerSchema.updateCustomerSchema),
    customerController.updateCustomer
);

router.get('/:id',
    tokenValidation.validateToken,
    customerController.getCustomerById
);

router.get('/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(customerSchema.getAllCustomerSchema),
    customerController.getAllCustomers
);

// Addresses

router.post('/:customerId/addresses/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerAddressSchema.createCustomerAddressSchema),
    customerAddressController.createCustomerAddress
);

router.put('/:customerId/addresses/:addressId',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerAddressSchema.updateCustomerAddressSchema),
    customerAddressController.updateCustomerAddress
);

router.get('/:customerId/addresses/:addressId',
    tokenValidation.validateToken,
    customerAddressController.getCustomerAddressById
);

router.get('/:customerId/addresses/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(customerAddressSchema.getAllCustomerAddressesSchema),
    customerAddressController.getAllCustomerAddresses
);

// Notes

router.post('/:customerId/notes/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerNoteSchema.createCustomerNoteSchema),
    customerNoteController.createCustomerNote
);

router.put('/:customerId/notes/:noteId',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(customerNoteSchema.updateCustomerNoteSchema),
    customerNoteController.updateCustomerNote
);

router.get('/:customerId/notes/:noteId',
    tokenValidation.validateToken,
    customerNoteController.getCustomerNoteById
);

router.get('/:customerId/notes/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(customerNoteSchema.getAllCustomerNotesSchema),
    customerNoteController.getAllCustomerNotes
);

router.delete('/:customerId/notes/:noteId',
  tokenValidation.validateToken,
  customerNoteController.deleteCustomerNote
);

// Files

router.post('/:customerId/files/',
    tokenValidation.validateToken,
    [multer.single('attachment')],
    joiSchemaValidation.validateBody(customerFileSchema.createCustomerFileSchema),
    customerFileController.createCustomerFile
);

router.put('/:customerId/files/:fileId',
    tokenValidation.validateToken,
    [multer.single('attachment')],
    joiSchemaValidation.validateBody(customerFileSchema.updateCustomerFileSchema),
    customerFileController.updateCustomerFile
);

router.get('/:customerId/files/:fileId',
    tokenValidation.validateToken,
    customerFileController.getCustomerFileById
);

router.get('/:customerId/files/',
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(customerFileSchema.getAllCustomerFilesSchema),
    customerFileController.getAllCustomerFiles
);

router.delete('/:customerId/files/:fileId',
  tokenValidation.validateToken,
  customerFileController.deleteCustomerFile
)

module.exports = router;