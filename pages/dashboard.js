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

const bookingsRef = collection(db, "bookings");

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [saveServedBy, setSaveServedBy] = useState("");
  const [editServedBy, setEditServedBy] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const b = [];
      snapshot.forEach((doc) => {
        b.push({ key: doc.id, ...doc.data() });
      });
      b.sort((a, b) => b.bookingNumber - a.bookingNumber);
      setBookings(b);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSaveServedBy = async (key) => {
    const updateServedBy = await updateDoc(doc(db, "bookings", key), {
      servedBy: saveServedBy,
      timestamp: serverTimestamp(),
    }).then(() => {
      setEditServedBy({});
    });
  };

  const deleteBooking = async (key) => {
    if (confirm("Confirm delete?") == true) {
      await deleteDoc(doc(db, "bookings", key));
    } else {
    }
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        style={{ filter: "blur(2px)" }}
        alt="background-image"
      />
      <NavBar />
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
          <div style={{ color: "white" }}>
            Total Bookings: {bookings.length + 1}
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
                  Pickup Date
                  <br />
                  and Time
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
                        setEditServedBy({ key, servedBy });
                        setSaveServedBy(servedBy);
                      }}
                    >
                      {editServedBy.key === key ? (
                        <>
                          <input
                            value={saveServedBy}
                            onChange={(e) => setSaveServedBy(e.target.value)}
                          />
                          <button onClick={() => handleSaveServedBy(key)}>
                            save
                          </button>
                        </>
                      ) : (
                        <div style={{ backgroundColor: "blue" }}>
                          {servedBy}
                        </div>
                      )}
                    </td>
                    <td>{name}</td>
                    <td>{emailId}</td>
                    <td>{mobileNumber}</td>
                    <td>{pickup}</td>
                    <td>{destination}</td>
                    <td>{noofPerson}</td>
                    <td>{carType}</td>
                    <td>
                      {pickupTime}
                      {" | "}
                      {pickupDate}
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
                  bookingNumber: bookings.length + 1,
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
    </main>
  );
}
