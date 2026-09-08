import {TransportRequest} from "../model/model.js";

export const createTransportRequest = async (req, res) => {
    console.log(req.user.id)
    console.log(req.body)
  try {
const {productType,quantity,pickupLocation,deliveryLocation,preferredPickupDate,requestedBy} = req.body;
    if (!productType || !quantity || !pickupLocation || !deliveryLocation || !preferredPickupDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const transportRequest = new TransportRequest({
      productType,
      quantity,
      pickupLocation,
      deliveryLocation,
      preferredPickupDate,
      requestedBy:req.user.id
    });
    await transportRequest.save();
    res.status(201).json({ message: 'Transport request created successfully', transportRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}

export const getAllTransportRequests = async (req, res) => {
  try {
    
 const transportRequests = await TransportRequest.find({
   requestedBy:req.user.id,
  $or: [
    { isDelete: false },
    { isDelete: { $exists: false } }
  ]
});  
    if (!transportRequests) {
      return res.status(404).json({ message: 'No transport requests found' });
    }
    res.status(200).json({ transportRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
export const getTransportRequestById = async (req, res) => {
  try {
    const { id } = req.params;
   const transportRequest = await TransportRequest.findOne({
  _id: id,
  $or: [
    { isDelete: false },
    { isDelete: { $exists: false } }
  ]
});
    if (!transportRequest) {
      return res.status(404).json({ message: 'Transport request not found' });
    }
    res.status(200).json({ transportRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTransportRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const transportRequest = await TransportRequest.findByIdAndUpdate(id, req.body, { new: true });
    if (!transportRequest) {
      return res.status(404).json({ message: 'Transport request not found' });
    } 
 res.status(200).json({ message: 'Transport request updated successfully', transportRequest });
}catch(error){
    res.status(500).json({ message: error.message });
    }
}
export const deleteTransportRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const transportRequest = await TransportRequest.findByIdAndUpdate
        (id, { isDeleted: true }, { new: true });
        if (!transportRequest) {
            return res.status(404).json({ message: 'Transport request not found' });
        }
        res.status(200).json({ message: 'Transport request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}