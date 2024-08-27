import Axios from "./Axios";

let fetchMessages = () => {
    return Axios.get('/api/chat/inbox');
};

let updateCategory = (data) => {
    return Axios.post('/api/chat/inbox', data,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

let sendEmailService = (data) => {
    return Axios.post('/api/chat/send-email', data,{
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

let retrainModelService = () => {
    return Axios.post('/api/chat/retrain-model');
};

let fetchCategories = () => {
    return Axios.get('/api/chat/categories');
};

export const InboxService = {
    fetchMessages, 
    updateCategory, 
    sendEmailService, 
    retrainModelService,
    fetchCategories
};