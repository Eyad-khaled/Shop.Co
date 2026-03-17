// "use client"
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { review } from '@/app/interfaces/product';
// import getUser from '@/app/functions/getUserOnClient';
// interface formDialog {
//     reviews : review[]
// }
// export default function FormDialog({reviews}: formDialog) {
//     const [open, setOpen] = React.useState(false);
//     const [review, setReview] = React.useState('');


//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const user = await getUser()
//         const now = new Date().toISOString()
//         console.log(review);
//         reviews.push({
//             comment:review,
//             rating: 3,
//             reviewerEmail: user?.email,
//             reviewerName:user?.user_metadata.user_name,
//             date:now
           
//         })
//         handleClose();
//     };

//     return (
//         <div>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Add A Review
//             </Button>
//             <Dialog open={open} onClose={handleClose} fullWidth sx={{ padding: '30px' }}>
//                 <DialogTitle>Review</DialogTitle>
//                 <DialogContentText sx={{ paddingLeft: '20px' }}>
//                     Add What You Think About This Product Here
//                 </DialogContentText>
//                 <DialogContent>
//                     <form onSubmit={handleSubmit} onChange={(e) => setReview(e.target.value)} id="subscription-form">
//                         <TextField
//                             autoFocus
//                             required
//                             margin="dense"
//                             id="name"
//                             name="Review"
//                             label="Write Your Review "
//                             type="text"
//                             fullWidth
//                             variant="standard"
//                         />
//                     </form>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button type="submit" form="subscription-form">
//                         Add
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
