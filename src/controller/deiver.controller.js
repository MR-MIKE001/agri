import {TransportRequest} from "../model/model.js";


export const availableTransportRequests = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'driver'|| req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only drivers can view available transport requests.' });
    }
    const transportRequests = await TransportRequest.find({ isAccepted: false, isDelete: false })
    ;
    res.json(transportRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptTransportRequest = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'driver') {
      return res.status(403).json({ message: 'Access denied. Only drivers can accept transport requests.' });
    } 
    const { requestId } = req.params;
    const driverId=req.user.id;
    const transportRequest = await TransportRequest.findByIdAndUpdate(requestId, { isAccepted: true, driverId: driverId }, { new: true });
    if (!transportRequest) {
      return res.status(404).json({ message: 'Transport request not found.' });
    }
    res.json(transportRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getDriverTransportRequests = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'driver') {
      return res.status(403).json({ message: 'Access denied. Only drivers can view their transport requests.' });
    }
    const driverId = req.user.id;
    const transportRequests = await TransportRequest.find({ driverId: driverId });
    res.json(transportRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const isDeliveredTransportRequest = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'driver') {
      return res.status(403).json({ message: 'Access denied. Only drivers can mark transport requests as delivered.' });
    }
    const { requestId } = req.params;
    const driverId = req.user.id;
    const transportRequest = await TransportRequest.findByIdAndUpdate(requestId, { isDelivered: true, driverId: driverId }, { new: true });
    if (!transportRequest) {
      return res.status(404).json({ message: 'Transport request not found.' });
    }
    res.json(transportRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};