import { handleError, useFetchSingleUser, UserAvatar, UserLean } from "replyke";
import { useEffect, useState } from "react";

function SingleTaskApplicant({ applicantId }: { applicantId: string }) {
  const fetchSingleUser = useFetchSingleUser();

  const [applicant, setApplicant] = useState<UserLean | null>(null);

  // const handleAssign = async (status: "assigned" | "dismissed") => {
  //   try {
  //     // if (!firestore) {
  //     //   throw new Error("Firestore wasn't initialized properly");
  //     // }
  //     // if (!user) {
  //     //   throw new Error("Please authenticate first");
  //     // }
  //     // if (user.id !== task?.authorId) {
  //     //   throw new Error("Only the author of this task can assign applicant");
  //     // }
  //     // const applicationRef = doc(
  //     //   firestore,
  //     //   getCollectionName("applications"),
  //     //   application.id
  //     // );
  //     // await updateDoc(applicationRef, {
  //     //   status,
  //     // });
  //   } catch (err: unknown) {
  //     console.log("Failed to assign applicant", err);
  //   }
  // };

  useEffect(() => {
    const handleFetchSingleUser = async () => {
      try {
        const fetchedApplicant = await fetchSingleUser({ userId: applicantId });

        if (fetchedApplicant) setApplicant(fetchedApplicant);
      } catch (err) {
        handleError(err, "Failed to fetch applicant");
      }
    };

    handleFetchSingleUser();
  }, [applicantId, fetchSingleUser]);

  if (!applicant) return null;

  return (
    <div className="border-b border-b-gray-300 pb-3 md:flex items-start">
      <div className="flex items-center gap-3 font-bold">
        <UserAvatar user={applicant} />
        {applicant.name}
      </div>

      {/* <div className="flex-1 md:mx-3 mt-1 md:mt-0">
        <div className="flex items-center justify-between flex-1">
          <p>
            טלפון נייד:{" "}
            {application.applicant_phone_number.replace("+972", "0")}
          </p>

          <div className="flex items-center">
            {(isApplicant || isDismissed) && (
              <div
                onClick={() => handleAssign("assigned")}
                className="bg-blue-500 text-white px-3 py-1 rounded-md mx-3 cursor-pointer"
              >
                הקצה למשימה
              </div>
            )}

            {(isApplicant || isAssigned) && (
              <p
                onClick={() => handleAssign("dismissed")}
                className="text-gray-500 cursor-pointer"
              >
                לא רלוונטי
              </p>
            )}
          </div>
        </div>
        {application.additional_info && (
          <div className="mt-2">
            <p className="text-sm text-gray-400 underline">פרטים נוספים:</p>
            <p>{application.additional_info}</p>
          </div>
        )}
      </div> */}
    </div>
  );

  // return (
  //   <div className="border-b border-b-gray-300 pb-3 " key={applicant.applicant_id}>

  //     <div className="flex justify-between">
  //       <div className="flex items-center">
  //         <UserAvatar
  //           avatar={applicant.applicant_avatar}
  //           id={applicant.applicant_id}
  //         />
  //         <p className="mx-3 font-bold">{applicant.applicant_name}</p>
  //         <p className="mx-3">
  //           (טלפון נייד: {applicant.applicant_phone_number.replace("+972", "0")}
  //           )
  //         </p>
  //       </div>
  //       <div className="flex items-center">
  //         {(isApplicant || isDismissed) && (
  //           <div
  //             onClick={() =>
  //               handleAssign({
  //                 assigned_to: arrayUnion(applicant),
  //                 dismissed: arrayRemove(applicant),
  //               })
  //             }
  //             className="bg-blue-500 text-white px-3 py-1 rounded-md mx-3 cursor-pointer"
  //           >
  //             הקצה למשימה
  //           </div>
  //         )}

  //         {(isApplicant || isAssigned) && (
  //           <p
  //             onClick={() =>
  //               handleAssign({
  //                 dismissed: arrayUnion(applicant),
  //                 assigned_to: arrayRemove(applicant),
  //               })
  //             }
  //             className="text-gray-500 cursor-pointer"
  //           >
  //             לא רלוונטי
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //     {applicant.additional_info && (
  //       <div className="mt-2 mr-2">
  //         <p className="text-sm text-gray-400 underline">פרטים נוספים:</p>
  //         <p>{applicant.additional_info}</p>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default SingleTaskApplicant;
