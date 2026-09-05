import { Schema as schema } from 'mongoose';
import { model } from 'mongoose';

const userSchema = new schema({
    fullName: {
        type: String,
        required: true
},
email:{
        type: String,
        required: true,
        unique: true
},
password: {
        type: String,
        required: true
},
phone: {
        type: String,
        required: true
},
role: {
        type: String,
        required: true
},
createdAt:{
    type: Date,
    default: Date.now
},
isDeleted: {
    type: Boolean,
    default: false},
})
const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    productUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now},
    productOwner: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});
const orderSchema = new schema({
    product: {
        type: schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderedBy: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    orderDate: {
        type: Date,
        default: Date.now},
    isPickedUp: {
        type: Boolean,
        default: false
    }

});
const acceptedOrderSchema = new schema({
    order: {
        type: schema.Types.ObjectId,
        ref: 'Order'
    },
    acceptedBy: {
        type: schema.Types.ObjectId,
        ref: 'User'},
    acceptedDate: {
        type: Date,
        default: Date.now
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
});
const TransportRequestSchema = new schema({
    productType: {
        type: String,
        required: true},
    quantity: {
        type: Number,
        required: true},
    pickupLocation: {
        type: String,
        required: true},
    deliveryLocation: {
        type: String,
        required: true},
    requestedBy: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    preferredPickupDate: {
        type: Date,
        required: true},
    isAccepted: {
        type: Boolean,
        default: false},
    acceptedBy: {
        type: schema.Types.ObjectId,
        ref: 'User'},
    isInTransit: {
        type: Boolean,
        default: false},
    isDelivered: {
        type: Boolean,
        default: false},
    isDelete:{
        type:Boolean,
        default:false
    },
    });
    
export const TransportRequest = model('TransportRequest', TransportRequestSchema);
export const User = model('User', userSchema);
export const Product = model('Product', productSchema);
export const Order = model('Order', orderSchema);
export const AcceptedOrder = model('AcceptedOrder', acceptedOrderSchema);

