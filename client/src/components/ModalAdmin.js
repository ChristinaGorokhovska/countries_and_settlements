// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { useHttp } from "../hooks/http.hook";
// import { useMessage } from "../hooks/messages.hook";

// const customStyles = {
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//     },
// };

// export const ModalAdmin = ({ settlement }) => {
//     const [country, setCountry] = useState([]);
//     // const [settlement, setSettlement] = useState(settlement);
//     const [modal, setModal] = useState(false);
//     const [form, setForm] = useState({ searchName: "" });
//     const { loading, request, error, clearError } = useHttp();
//     const msg = useMessage();

//     const changeHandler = (event) => {
//         console.log("changeHandler starts...");
//         setForm({ ...form, [event.target.name]: event.target.value });
//     };

//     const deleteCountry = (nameCountry) => {
//         // Axios.delete(`/api/main/search/settlements/${nameCountry}`).then((res) => {
//         //     console.log(nameCountry);
//         //     console.log("Deleted!");
//         // });
//         try {
//             const data = request(`/api/main/search/settlements/${nameCountry}`, "DELETE");
//             console.log(data);
//         } catch (e) {}
//     };

//     const deleteSettlement = async (nameSettlement) => {
//         // Axios.delete(`/api/main/search/settlements/${nameSettlement}`).then((res) => {
//         //     console.log(nameSettlement);
//         //     console.log("Deleted!");
//         // });
//         try {
//             const data = await request(`/api/main/search/settlements/${nameSettlement}`, "DELETE");
//             console.log(data);
//             setSettlement([]);
//             msg(data.message);
//         } catch (e) {}
//     };

//     //UseEffects
//     useEffect(() => {
//         msg(error);
//         clearError();
//     }, [error, msg, clearError]);

//     return (
//         <div className="admin-buttons d-flex justify-content-end mt2">
//             <button className="btn btn-info" onClick={() => setModal(true)}>
//                 Змінити
//             </button>
//             <button
//                 className="btn btn-danger ml1"
//                 onClick={(e) => {
//                     e.preventDefault();
//                     deleteSettlement(val.name_settlement);
//                 }}
//             >
//                 Видалити
//             </button>

//             <Modal style={customStyles} isOpen={modal}>
//                 <div className="modal-block high">
//                     <div className="modal-header">
//                         <h5 className="modal-title">Змінити дані про населений пункт</h5>
//                     </div>
//                     <div className="modal-body">
//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />

//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />

//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />
//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />
//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />
//                         <label className="form-label">Назва населеного пункту</label>

//                         <input
//                             placeholder="Enter email"
//                             type="text"
//                             className="form-control"
//                             id=""
//                             name=""
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">
//                             Close
//                         </button>
//                         <button type="button" className="btn btn-primary">
//                             Save changes
//                         </button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// };
