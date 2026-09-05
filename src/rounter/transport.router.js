import {Router} from 'express';
import {createTransportRequest, getAllTransportRequests, getTransportRequestById,
     updateTransportRequest, deleteTransportRequest} from '../controller/transportrequest.controller.js';
import { verifyToken } from '../middleware/jwt.js';
const TransportRouter = Router();

TransportRouter.get('/transports', verifyToken, getAllTransportRequests);
TransportRouter.get('/transports/:id', verifyToken, getTransportRequestById);
TransportRouter.post('/transports', verifyToken, createTransportRequest);
TransportRouter.put('/transports/:id', verifyToken, updateTransportRequest);
TransportRouter.delete('/transports/:id', verifyToken, deleteTransportRequest);
export default TransportRouter;