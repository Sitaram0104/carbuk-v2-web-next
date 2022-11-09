import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebaseConfig";
import { useSnackbar } from "notistack";

const bookingsRef = collection(db, "bookings");

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [editField, setEditField] = useState({});
  const [sortByButton, setSortByButton] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const b = [];
      snapshot.forEach((doc) => {
        b.push({ key: doc.id, ...doc.data() });
      });
      if (sortByButton) {
        b.sort(CustomSort);
      } else {
        b.sort((a, b) => b.bookingNumber - a.bookingNumber);
      }
      setBookings(b);
    });

    return () => {
      unsubscribe();
    };
  }, [sortByButton]);

  const deleteBooking = async (key) => {
    if (confirm("Confirm delete?") == true) {
      await deleteDoc(doc(db, "bookings", key));
    } else {
    }
  };

  const handleSave = async (key) => {
    const updateSaveField = await updateDoc(doc(db, "bookings", key), {
      [editField.field]: editField.fieldValue,
      timestamp: serverTimestamp(),
    }).then(() => {
      setEditField({});
      enqueueSnackbar("updated successfully", {
        variant: "success",
      });
    });
  };

  const CustomSort = (a, b) => {
    if (a.pickupDate < b.pickupDate) {
      return 1;
    } else if (a.pickupDate > b.pickupDate) {
      return -1;
    } else {
      if (a.pickupTime < b.pickupTime) {
        return 1;
      } else if (a.pickupTime > b.pickupTime) {
        return -1;
      } else {
        return 0;
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ zIndex: 1 }}
    >
      <div
        style={{
          backdropFilter: "blur(14px)",
          padding: "1rem",
          maxWidth: "100vw",
          overflowX: "auto",
        }}
      >
        <div style={{ color: "white" }} className="d-flex">
          <div className="me-3">Total Bookings: {bookings.length + 1}</div>
          <button onClick={() => setSortByButton(!sortByButton)}>
            Sort by date and time
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                Booking
                <br />
                Number
              </th>
              <th>
                Served
                <br />
                by
              </th>
              <th>
                User
                <br />
                Name
              </th>
              <th>Email Id</th>
              <th>Mobile No</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>
                No of
                <br />
                Person
              </th>
              <th>Car Type</th>
              <th>
                Pickup
                <br />
                Time
              </th>
              <th>
                Pickup
                <br />
                Date
              </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(
              ({
                key,
                bookingNumber,
                carType,
                destination,
                emailId,
                mobileNumber,
                name,
                noofPerson,
                pickup,
                pickupDate,
                pickupTime,
                servedBy,
              }) => (
                <tr key={key} className={`newItem ${servedBy && "served"}`}>
                  <td>{bookingNumber}</td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "servedBy",
                        fieldValue: servedBy,
                      });
                    }}
                  >
                    {editField.key === key && editField.field === "servedBy" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "servedBy",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{servedBy}</div>
                    )}
                  </td>

                  <td
                    onClick={() => {
                      setEditField({ key, field: "name", fieldValue: name });
                    }}
                  >
                    {editField.key === key && editField.field === "name" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "name",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{name}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "emailId",
                        fieldValue: emailId,
                      });
                    }}
                  >
                    {editField.key === key && editField.field === "emailId" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "emailId",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{emailId}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "mobileNumber",
                        fieldValue: mobileNumber,
                      });
                    }}
                  >
                    {editField.key === key &&
                    editField.field === "mobileNumber" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "mobileNumber",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{mobileNumber}</div>
                    )}
                  </td>

                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "pickup",
                        fieldValue: pickup,
                      });
                    }}
                  >
                    {editField.key === key && editField.field === "pickup" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "pickup",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{pickup}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "destination",
                        fieldValue: destination,
                      });
                    }}
                  >
                    {editField.key === key &&
                    editField.field === "destination" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "destination",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{destination}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "noofPerson",
                        fieldValue: noofPerson,
                      });
                    }}
                  >
                    {editField.key === key &&
                    editField.field === "noofPerson" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "noofPerson",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{noofPerson}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "carType",
                        fieldValue: carType,
                      });
                    }}
                  >
                    {editField.key === key && editField.field === "carType" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "carType",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{carType}</div>
                    )}
                  </td>

                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "pickupTime",
                        fieldValue: pickupTime,
                      });
                    }}
                  >
                    {editField.key === key &&
                    editField.field === "pickupTime" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          type="time"
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "pickupTime",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{pickupTime}</div>
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setEditField({
                        key,
                        field: "pickupDate",
                        fieldValue: pickupDate,
                      });
                    }}
                  >
                    {editField.key === key &&
                    editField.field === "pickupDate" ? (
                      <>
                        <input
                          value={editField?.fieldValue}
                          type="date"
                          onChange={(e) =>
                            setEditField({
                              key,
                              field: "pickupDate",
                              fieldValue: e.target.value,
                            })
                          }
                        />
                        <button onClick={() => handleSave(key)}>save</button>
                      </>
                    ) : (
                      <div>{pickupDate}</div>
                    )}
                  </td>

                  <td>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteBooking(key)}
                    >
                      🗑️
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <button
          onClick={() =>
            setBookings([
              {
                key: bookings.length + 1,
                bookingNumber:
                  Math.max(
                    ...bookings.map(({ bookingNumber }) => bookingNumber),
                    0
                  ) + 1,
                carType: "0",
                destination: "0",
                emailId: "0@gmail.com",
                mobileNumber: 1,
                name: "00",
                noofPerson: 1,
                pickup: "0",
                pickupDate: "2022-10-08",
                pickupTime: "15:20",
                servedBy: "Zafar",
              },
              ...bookings,
            ])
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}
