import {Router} from 'express';
import {
  availableTransportRequests,
  acceptTransportRequest,
  getDriverTransportRequests,
  isDeliveredTransportRequest
} from '../controller/deiver.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const driverRouter = Router();

driverRouter.get('/available',verifyToken, availableTransportRequests);
driverRouter.patch('/accept/:requestId', verifyToken, acceptTransportRequest);
driverRouter.get('/my-requests', verifyToken, getDriverTransportRequests);
driverRouter.patch('/delivered/:requestId', verifyToken, isDeliveredTransportRequest);

export default driverRouter;