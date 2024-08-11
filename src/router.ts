/* eslint-disable @typescript-eslint/no-empty-function */
import {Router as createRouter} from 'express'
import {body, param} from 'express-validator'
import {handleExpressValidatorErrors} from './modules/middleware.js'

const router = createRouter()

/**
 * Product routes
 */

router.get('/product', () => {})
router.get(
  '/product/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)
router.post('/product', () => {})
router.put(
  '/product/:id',
  [param('id').isUUID(), body('name').isString(), handleExpressValidatorErrors],
  () => {},
)
router.delete(
  '/product/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)

/**
 * Update routes
 */

router.get('/update', () => {})
router.get(
  '/update/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)
router.post(
  '/update',
  [
    body('title').isString(),
    body('content').isString(),
    body('asset').isString().optional(),
    body('version').isString().optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    handleExpressValidatorErrors,
  ],
  () => {},
)
router.put(
  '/update/:id',
  [
    param('id').isUUID(),
    body('title').isString().optional(),
    body('content').isString().optional(),
    body('asset').isString().optional(),
    body('version').isString().optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    handleExpressValidatorErrors,
  ],
  () => {},
)
router.delete(
  '/update/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)

/**
 * Update point routes
 */

router.get('/update-point', () => {})
router.get(
  '/update-point/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)
router.post(
  '/update-point',
  [
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    handleExpressValidatorErrors,
  ],
  () => {},
)
router.put(
  '/update-point/:id',
  [
    param('id').isUUID(),
    body('name').isString().optional(),
    body('description').isString().optional(),
    handleExpressValidatorErrors,
  ],
  () => {},
)
router.delete(
  '/update-point/:id',
  [param('id').isUUID(), handleExpressValidatorErrors],
  () => {},
)

export default router
