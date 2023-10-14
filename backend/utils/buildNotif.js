import io from "../initial.js";
import Campaign from "../models/Campaign.js";
import Notification from "../models/Notification.js";

let onlineUsers = new Set();

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

export const onConnection = async (user,address)=>{
    const notif = new Notification({
        receiptId : user._id,
        notifTitle: "Welcome!",
        notifPayload: `Welcome to T-Raise ! this is your address ${address} . Visit Settings to manage your notifications.`,
        notifType:"success",
        titleAlert:"Welcome! This is your first visit. Enjoy!! "
    });    
    await notif.save();
    const notifications = await Notification.find({receiptId:notif.receiptId , isDeleted : 0});
    io.on("connection", socket => {
        console.log('New client connected');

        socket.to(socket.id).emit('userLoggedIn',async() => {

            if (!onlineUsers.has(socket.id)) {
            // user.socketId = socket.id
            onlineUsers.add(socket.id); // Add the user to the set if not already present
            console.log(onlineUsers);
            io.to(socket.id).emit('newLoginNotif');
            } 
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            onlineUsers.delete(socket.id); // Remove the disconnected user from the set
        });
        
});
}
export const statusUpdate = async(user)=>{
    const notif = new Notification({
        receiptId : user._id,
        notifTitle: "Status Verification",
        notifPayload: "Congratulation ! , your account has been verified. You can now enjoy with all the T-Raise features. ",
        notifType:"success",
        titleAlert:"Congratulation ! your account is verified ! "
    });    
    await notif.save();
    const notifications = await Notification.find({receiptId:notif.receiptId , isDeleted : 0});
    io.on("connection", socket => {
        console.log('New client connected');
       
        if (!onlineUsers.has(socket.id)) {
            onlineUsers.add(socket.id);
            io.to(socket.id).emit('userStatusUpdate');
        }
       
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            onlineUsers.delete(socket.id); // Remove the disconnected user from the set
        });

    });
}

export const notifStartCampaign = async (campaign)=>{
    const notif = new Notification({
        receiptId : campaign.companyId,
        notifTitle: "New Campaign",
        notifPayload: `Congratulation ! , you have successfully started your fund raising campaign valid until ${campaign.expirationDate} . Please check your campaign section for more details.`,
        notifType:"success",
        titleAlert:"Congratulation ! your campaign has started !"
    });    
    await notif.save();
    const notifications = await Notification.find({receiptId:notif.receiptId , isDeleted : 0});
    io.on("connection", socket => {
        console.log('New client connected');
       
        if (!onlineUsers.has(socket.id)) {
            onlineUsers.add(socket.id);
            io.to(socket.id).emit('notifStartCampaign');
        }
       
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            onlineUsers.delete(socket.id); // Remove the disconnected user from the set
        });

    });
} 
export const campaignExpirationAlert = async (user)=>{
    const campaign =await Campaign.find({companyId : user._id});
    console.log(campaign);
    if(campaign){
        const today = new Date();
        const timeDifference = campaign[0].expirationDate - today;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        if(daysDifference <= 2 && daysDifference > 0){
            const notif = new Notification({
                receiptId : campaign[0].ownerId,
                notifTitle: "Campaign Expiration",
                notifPayload: `Warning! , this is a reminder .Your campaign expires in ${Math.round(daysDifference)} days.`,
                notifType: "warning",
                titleAlert: "Warning ! your campaign expires soon !"
            });    
            await notif.save();
            const notifications = await Notification.find({receiptId:notif.receiptId , isDeleted : 0});
            io.on("connection", socket => {
                console.log('New client connected');
                if (!onlineUsers.has(socket.id)) {
                    onlineUsers.add(socket.id);
                    io.to(socket.id).emit('campaignExpirationAlert');    
                }
               
                socket.on('disconnect', () => {
                    console.log('Client disconnected');
                    onlineUsers.delete(socket.id); // Remove the disconnected user from the set
                });
        
            });
        }
    }  
    //   io.on("connection", socket => {
    //         console.log('New client connected');  
    //     const campaign = Campaign.find({ownerId : user._id});
    //     if(campaign){
    //     // Calculate the difference between the two dates in milliseconds
    //     const timeDifference = campaign.expirationDate - new Date();

    //     // Convert milliseconds to days
    //     const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    //     // Round the difference to the nearest whole number (optional)
    //     const roundedDaysDifference = Math.round(daysDifference);
    //     if (roundedDaysDifference<=2 && roundedDaysDifference>2) {
    //         if (!onlineUsers.has(socket.id)) {
    //             onlineUsers.add(socket.id);
    //             io.to(socket.id).emit('campaignExpirationAlert', "Warning !! your campaign is about to end");
    //         }
    //     }
    // }
    //     socket.on('disconnect', () => {
    //         console.log('Client disconnected');
    //         onlineUsers.delete(socket.id); // Remove the disconnected user from the set
    //     });

    // });
}
export const endedCampaign = async (updatedCampaign,user)=>{
    if(updatedCampaign.successStatus === 1){
        if(user.userType === 'startup'){
            const notif = new Notification({
                receiptId : user._id,
                notifTitle: "Campaign Ended Successfully",
                notifPayload: `Congratulation! Your campaign is successfully ended. Administration will contact you for further details .`,
                notifType: "success",
                titleAlert: "Congratulation ! Campaign ended successfully ! "
            });    
            await notif.save();
        }else{
            const notif = new Notification({
                receiptId : user._id,
                notifTitle: "Investment Success",
                notifPayload: `Congratulation! You got a successful investment ,Administration will contact you for further details `,
                notifType: "success",
                titleAlert:"Congratulation ! Campaign ended successfully !"
            });    
            await notif.save();

        }
        const notifications = await Notification.find({receiptId: user._id , isDeleted : 0});
        io.on("connection", socket => {
            if (!onlineUsers.has(socket.id)) {
                onlineUsers.add(socket.id);
                io.to(socket.id).emit('successCampaign');    
            }
           
            socket.on('disconnect', () => {
                onlineUsers.delete(socket.id); // Remove the disconnected user from the set
            });
    
        });

    }else{
        if(user.userType === 'startup'){
            const notif = new Notification({
                receiptId : user._id,
                notifTitle: "Campaign Failed",
                notifPayload: ` Unfortunately! Your running campaign reached the expiration date without fullfiling its goal.`,
                notifType: "error",
                titleAlert:"Unfortunately ! Campaign failed ! "
            });    
            await notif.save();
        }else{
            const notif = new Notification({
                receiptId : user._id,
                notifTitle: "Investment Failed",
                notifPayload: `Unfortunately! your investment had been failed . Administration will contact you for further details . `,
                notifType: "error",
                titleAlert:"Unfortunately ! Campaign failed ! "
            });    
            await notif.save();

        }
        const notifications = await Notification.find({receiptId:user._id , isDeleted : 0});
        io.on("connection", socket => {
            if (!onlineUsers.has(socket.id)) {
                onlineUsers.add(socket.id);
                io.to(socket.id).emit('failedCampaign');    
            }
           
            socket.on('disconnect', () => {
                onlineUsers.delete(socket.id); // Remove the disconnected user from the set
            });
    
        });

    }
}