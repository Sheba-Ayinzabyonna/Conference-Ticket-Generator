import { useState } from "react";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import TicketBooked from "./TicketBooked";

const App = () => {
  const [step, setStep] = useState(1);
  const [attendeeDetails, setAttendeeDetails] = useState({
    name: "",
    email: "hello@aviolagos.io",
    ticketType: "Free",
    ticketCount: 1,
    specialRequest: "",
    profileImage: "",
  });

  const onNextStep = (updatedDetails) => {
    setAttendeeDetails((prev) => ({ ...prev, ...updatedDetails }));
    setStep(step + 1);
  };

  const onPreviousStep = () => {
    setStep(step - 1);
  };

  const onBookAnotherTicket = () => {
    setStep(1);
    setAttendeeDetails({
      name: "",
      email: "hello@aviolagos.io",
      ticketType: "Free",
      ticketCount: 1,
      specialRequest: "",
      profileImage: "",
    });
  };

  return (
    <div>
           {step === 1 && <TicketSelection onNext={onNextStep} />}
      {step === 2 && (
        <AttendeeDetails
          onNext={onNextStep}
          onBack={onPreviousStep}
          attendeeDetails={attendeeDetails}
        />
      )}
      {step === 3 && (
        <TicketBooked
          attendeeDetails={attendeeDetails}
          onBookAnotherTicket={onBookAnotherTicket}
        />
      )}
    </div>
  );
};

export default App;
