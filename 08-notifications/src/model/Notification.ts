import mongoose, { InferSchemaType } from "mongoose";

const Schema = mongoose.Schema;

const Notification = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
}, {
    collection: "notification"
})

const NotificationModel = mongoose.model('notification', Notification);

export type Notification = InferSchemaType<typeof Notification>;

export default NotificationModel;