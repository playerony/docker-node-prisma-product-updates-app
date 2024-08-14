import {Router as createRouter} from 'express'
import {body, param} from 'express-validator'
import {handleExpressValidatorErrors} from './modules/middleware.js'
import * as productHandlers from './handlers/product.js'
import * as updateHandlers from './handlers/update.js'
import * as updatePointHandlers from './handlers/update-point.js'

const router = createRouter()

/**
 * Product routes
 */

// @ts-expect-error User will be added to the request object by the auth middleware
router.get('/product', productHandlers.getProducts)
router.get(
  '/product/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  productHandlers.getProductById,
)
router.post(
  '/product',
  [body('name').isString(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  productHandlers.createProduct,
)
router.put(
  '/product/:id',
  [param('id').isUUID(), body('name').isString(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  productHandlers.updateProduct,
)
router.delete(
  '/product/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  productHandlers.deleteProduct,
)

/**
 * Update routes
 */

// @ts-expect-error User will be added to the request object by the auth middleware
router.get('/update', updateHandlers.getUpdates)
router.get(
  '/update/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updateHandlers.getUpdateById,
)
router.post(
  '/update',
  [
    body('title').isString(),
    body('content').isString(),
    body('productId').isString(),
    body('asset').isString().optional(),
    body('version').isString().optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    handleExpressValidatorErrors,
  ],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updateHandlers.createUpdate,
)
router.put(
  '/update/:id',
  [
    param('id').isUUID(),
    body('title').isString().optional(),
    body('content').isString().optional(),
    body('asset').isString().optional(),
    body('version').isString().optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    handleExpressValidatorErrors,
  ],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updateHandlers.updateUpdate,
)
router.delete(
  '/update/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updateHandlers.deleteUpdate,
)

/**
 * Update point routes
 */

// @ts-expect-error User will be added to the request object by the auth middleware
router.get('/update-point', updatePointHandlers.getUpdatePoints)
router.get(
  '/update-point/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updatePointHandlers.getUpdatePointById,
)
router.post(
  '/update-point',
  [
    body('name').isString(),
    body('updateId').isString(),
    body('description').isString(),
    handleExpressValidatorErrors,
  ],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updatePointHandlers.createUpdatePoint,
)
router.put(
  '/update-point/:id',
  [
    param('id').isUUID(),
    body('name').isString().optional(),
    body('description').isString().optional(),
    handleExpressValidatorErrors,
  ],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updatePointHandlers.updateUpdatePoint,
)
router.delete(
  '/update-point/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  // @ts-expect-error User will be added to the request object by the auth middleware
  updatePointHandlers.deleteUpdatePoint,
)

export default router
