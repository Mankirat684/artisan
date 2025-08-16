import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    images : {
        type: [String],
        required: true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true,
        min: [0,"Quantity must be positive"]
    },
    isPublished : {
        type: Boolean,
        default: false
    },
    category : {
        type: String,
        required: true
    },
    aiGenerated : {
        description: {
            type: Boolean,
            default: false
        },
        price: {
            type: Boolean,
            default: false
        }
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;